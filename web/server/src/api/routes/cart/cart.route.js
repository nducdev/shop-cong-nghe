import express from 'express'
import protect from '../../middlewares/auth.middleware.js'
import { verifyAccessToken } from '../../../utils/jwt/verifyToken.utils.js'
import addCart from '../../controllers/cart/addCart.controller.js'
import findCart from '../../controllers/cart/findCart.controller.js'
import countCart from '../../controllers/cart/countCart.controller.js'
import deleteCart from '../../controllers/cart/deleteCart.controller.js'

const router = express.Router()

router.post('/add-cart', protect, verifyAccessToken, addCart)
router.post('/find-cart', protect, verifyAccessToken, findCart)
router.post('/count-cart', protect, verifyAccessToken, countCart)
router.post('/delete-cart', protect, verifyAccessToken, deleteCart)

export default router
