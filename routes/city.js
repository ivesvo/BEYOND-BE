var express = require('express');
var router = express.Router();
const { getCityList, createCity} = require('../controllers/cityController')
const {getEventbyCity} = require('../controllers/eventController')


router.route('/')
    .post(createCity)
    .get(getCityList)


module.exports = router;