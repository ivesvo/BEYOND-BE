const User = require("../models/user");
const jwt = require('jsonwebtoken')

exports.loginRequired = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
             res.status(400).json({ status: "Fail", message: "Token is required" })
        }
        const token = req.headers.authorization.replace("Bearer ", "");
        const decoded = jwt.verify(token, process.env.SECRET);

        const user = await User.findOne({ tokens: token, _id: decoded._id })
        if (!user) throw new Error("Unauthorised")
        req.user = user
    } catch (err) {
        return res.status(401).json({ status: "fail", error: err.message })
    }
    next();
}


exports.adRequired = (req, res, next) => {
    if (req.user.role != "admin") {
        return res.status(401).json({ status: "fail", message: "Admin required" })
    }
    next()
}
