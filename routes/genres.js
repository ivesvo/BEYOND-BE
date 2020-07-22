var express = require('express');
var router = express.Router();
const {getGenreList, createGenre, updateGenre, deleteGenre} = require ('../controllers/genreController')


router.route('/')
    .post(createGenre)
    .get(getGenreList)


router.route('/:gid')
    // .get(findExpsbyTags)
    .patch(updateGenre)
    .delete(deleteGenre)

module.exports = router;