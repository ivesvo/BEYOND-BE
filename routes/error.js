var express = require('express');
var router = express.Router();


var {notFound} =  require('../controllers/errorController')

router.route('*').all(notFound)

module.exports = router 