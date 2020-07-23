var express = require('express');
const { loginWithEmail, logout, loginFacebook } = require('../controllers/authController');

const { loginRequired } = require('../middleware/auth');

var router = express.Router();


//localhost:5000/auth/login
router.route("/login/facebook")
.get(loginFacebook)

router.route("/login")
.post(loginWithEmail)


router.route('/logout')
.post(loginRequired, logout)

module.exports = router;    