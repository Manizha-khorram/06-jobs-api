const express = require('express')
const router = express.Router()

const {getAllArtCollectibles , getArtCollectible , creatArtCollectible, updateArtCollectible , deleteArtCollectible, } = require ('../controllers/ArtCollectibles')


router.route('/').post(creatArtCollectible).get(getAllArtCollectibles)
router.route('/:id').get(getArtCollectible).delete(deleteArtCollectible).patch(updateArtCollectible)


module.exports = router ;