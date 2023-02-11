const express = require('express')
const router = express.Router()
const {getAllUsers , deleteUser , } = require('../controllers/Admin')



router.route('/users').get(getAllUsers)
router.route('/:id').delete(deleteUser)
module.exports = router ;