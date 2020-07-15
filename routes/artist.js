var express = require('express');
var router = express.Router();
const {getArtistList, createArtist, updateArtist, deleteArtist, getArtistByTitle} = require ('../controllers/artistController');
const { route } = require('./users');


router.route('/')
    .post(createArtist)
    .get(getArtistList)


router.route('/:title')
    .get(getArtistByTitle)

router.route('/:aid')
    // .get(findExpsbyTags)
    // .patch(updateArtist)
    .delete(deleteArtist)

module.exports = router;