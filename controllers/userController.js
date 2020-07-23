// const {catchAsync} = require('./errorController')
const axios = require('axios')
const User = require("../models/user");

exports.createUser = async (req, res) => {
    try {
        const { email, name, password} = req.body;
        if (!email || !password ||!name) {
            return res.status(400).json({
                status: "fail",
                error: "email, password and name of user is required"
            });
        }
        const user = await User.create({ email: email, password: password, name: name, role: role || "normal" })
        res.status(201).json({ status: "OK", data: user})
    }
    catch (err) {
        console.log(err)
        res.status(500).json({ status: "error", error: err.message })
    }
}

exports.getUsers = async (req,res) =>{
    try{
        const userList = await User.find({})
            res.status(200).json({
                status: "Success",
                data: userList
            })

    } catch (err){
        console.log(err)
        res.status(500).json({ status: "error", error: err.message })
    }
}

exports.getMyProfile = async (req, res) => {
    res.json({ status: "ok", data: req.user })
}

// exports.loginFacebook = async (req,res)=>{
//     const fbToken = req.body.fbToken
//     if(!fbToken){
//         return res.status(401).json({status: fail, error:"Need Token"})
//     }
//     try{
//     const data = await axios.get(`https://graph.facebook.com/me?fields=id,name,email&access_token=${fbToken}`)
//     const info = data.data
//     console.log(info)
//     return info
//     } catch (error){
//         console.log(error);
//     } return null;
//     };


    // console.log("HFJHFKKLV",data)
    // const user  = await User.findOneOrCreate(
  
    //     data.data.email,
    //     data.data.name,
    //   )

    //   const token = await user.generateToken()
    //   return res.json({user,token})
    // res.send("OK")

