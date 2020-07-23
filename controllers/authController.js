const User = require("../models/user");

const axios = require('axios');



exports.loginWithEmail = async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ status: "fail", error: "Email and password are required" })
    }
    const user = await User.loginWithEmail(email, password);
    if (!user) {
        return res.status(401).json({ status: "fail", error: "Wrong email or password" })
    }
    const token = await user.generateToken();

    res.json({ status: "OK", data: { user: user, token: token } })
}


exports.logout = async (req, res) => {
    const token = req.headers.authorization.replace("Bearer ", "");
    req.user.tokens.filter(item => item.token != token)
    res.json({ status: "OK", data: null })

}

exports.loginFacebook = async (req, res, next) => {
    console.log("dwdqwxsxsd")
    const fbToken = req.query.token

    if (!fbToken) {
        return res.status(401).json({ status: "fail", error: "Need Token" })
    }
    const data = await axios.get(`https://graph.facebook.com/me?fields=id,name,email&access_token=${fbToken}`)
    console.log("HFJHFKKLV", data)
    const user = await User.findOneOrCreate({
        name: data.data.name,
        email: data.data.email
    })
    const token = await user.generateToken()
    res.json({ status: "OK", data: user, token })

}