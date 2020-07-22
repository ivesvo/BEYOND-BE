var express = require('express');
const {getUsers, createUser, getMyProfile } = require('../controllers/userController');

const {loginRequired} = require('../middleware/auth')
var router = express.Router();


router.route('/')
  .get(getUsers)
  .post(createUser)

router.route('/me')
  .get(loginRequired, getMyProfile)


module.exports = router;