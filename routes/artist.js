var express = require('express');
var router = express.Router();
const {getArtistList, createArtist, updateArtist, deleteArtist} = require ('../controllers/artistController')


router.route('/')
    .post(createArtist)
    .get(getArtistList)
    

router.route('/:aid')
    // .get(findExpsbyTags)
    // .patch(updateArtist)
    .delete(deleteArtist)

module.exports = router;