
const express = require ('express');
const router = express.Router();
const {createCart , getCart, deleteCart} = require ('../controllers/customer-user-cart')

router.route('/').get(getCart)
router.route('/').post(createCart)
router.route('/:id').delete(deleteCart)

module.exports = router ;