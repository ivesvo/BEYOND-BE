const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const round = 10;
const jwt = require('jsonwebtoken');
const { token } = require('morgan');
const Cart = require('./cart');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Email is invalid")
            }
        }
    },
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,

    },
    password: {
        type: String,
        // required: [true, "Password is required"] // turning this off because logging in from Facebook
    },
    role:{
        type: String,
        enum:['normal', 'admin'],
        required: [true, 'role type is required'],
        default: 'normal'

    },
    tokens: [String]
}, {
    timestmaps: true,
    toJSON: { virtuals: true },
    toObject: { virtual: true }
})

userSchema.methods.toJSON = function () { //method: this will refer to the instance
    const obj = this.toObject();
    delete obj.password
    delete obj.id;
    delete obj.tokens;
    return obj
}
//generate Token

userSchema.methods.generateToken = async function () {
    // this will refer to the instance  of User 
    const token = jwt.sign({
        _id: this._id
    }, process.env.SECRET, { expiresIn: "7d" });
    this.tokens.push(token) // User.token
    await this.save()
    return token
}

userSchema.methods.generatePendingCart = async function (){
    let cart = await Cart.findOne({user:this._id, status: 'pending'})
    if (!cart){
        cart = await Cart.create({
            user: this._id,
            items: [],
            status: 'pending'
        })
    }
    return cart 
}






userSchema.statics.loginWithEmail = async function (email, password) { //statics: this will refer to the class
    const user = await this.findOne({ email: email }) // this will refer to the class User
    if (!user) {
        return null
    }
    const match = await bcrypt.compare(password, user.password) //match is boolean
    if (match) {
        return user
    } else {
        return null
    }
}

//user.save()

userSchema.pre("save", async function (next) {
    console.log(this)
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, round);
    };
    next();
})

userSchema.statics.findOneOrCreate = async function({email,name}){
    // this refers to User model 
    let user = await this.findOne({email});
    if(!user){
        user = this.create({
            email:email,
            name: name,
         })
    }
    return user 
}   
const User = mongoose.model("User", userSchema)
module.exports = User