var express = require('express');
var router = express.Router();
const { loginRequired, adRequired } = require('../middleware/auth');
const { getEventList, createEvent, updateEvent, deleteEvent, getEventById, getEventByTiTle} = require('../controllers/eventController');



router.route('/')
    .post(loginRequired, adRequired, createEvent)
    .get(getEventList)


router.route('/:eid')
     .get(getEventById)
     .put(loginRequired, adRequired, updateEvent)
     .delete(loginRequired, adRequired, deleteEvent)
// // .get(findExpsbyTags)


module.exports = router;