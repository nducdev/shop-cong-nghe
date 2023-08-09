import express from 'express'
import protect from '../../middlewares/auth.middleware.js'
import { verifyAccessToken } from '../../../utils/jwt/verifyToken.utils.js'
import createOrder from '../../controllers/order/createOrder.controller.js'
import createDelivery from '../../controllers/order/createDelivery.controller.js'
import findDelivery from '../../controllers/order/findDelivery.controller.js'
import findOrder from '../../controllers/order/findOrder.controller.js'

const router = express.Router()

router.post('/create-order', protect, verifyAccessToken, createOrder)
router.post('/create-delivery', protect, verifyAccessToken, createDelivery)
router.post('/find-delivery', protect, verifyAccessToken, findDelivery)
router.post('/find-order', protect, verifyAccessToken, findOrder)

export default router
