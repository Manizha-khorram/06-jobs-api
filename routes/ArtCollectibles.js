const express = require('express')
const router = express.Router()
const multer = require('multer')
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limit:{fileSize: 16777216}});

const { getAllArtCollectibles , getArtCollectible , creatArtCollectible, updateArtCollectible , deleteArtCollectible, getImage, } = require ('../controllers/ArtCollectibles')


router.route('/').post( upload.single('image'), creatArtCollectible).get(getAllArtCollectibles)
router.route('/:id').get(getArtCollectible).delete(deleteArtCollectible).patch(upload.single('image'), updateArtCollectible)
router.route('/image/:id').get(getImage)


module.exports = router ;