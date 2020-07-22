var express = require('express');
var router = express.Router();
const { getCartList, addToCart} = require('../controllers/cartController')
const {loginRequired} = require('../middleware/auth')

router.route('/')
    .get(loginRequired, getCartList)
    .post (loginRequired, addToCart)
    

module.exports = router;