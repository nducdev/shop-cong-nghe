import express from 'express'
import protect from '../../middlewares/auth.middleware.js'
import { verifyAccessToken } from '../../../utils/jwt/verifyToken.utils.js'
import createDelivery from '../../controllers/order/createDelivery.controller.js'
import getAllOrder from '../../controllers/order/getOrder.controller.js'
import updateOrder from '../../controllers/order/updateOrder.controller.js'
import cancelOrder from '../../controllers/order/cancelOrder.controller.js'
import revenueYear from '../../controllers/order/revenueYear.controller.js'
import revenueDay from '../../controllers/order/renevueDay.controller.js'
import revenueMonth from '../../controllers/order/revenueMonth.controller.js'

const router = express.Router()

router.get('/orders', protect, verifyAccessToken, getAllOrder)
router.put('/update-order', protect, verifyAccessToken, updateOrder)
router.post('/cancel-order', protect, verifyAccessToken, cancelOrder)
router.post('/create-delivery', protect, verifyAccessToken, createDelivery)
router.get('/renevue-day', protect, verifyAccessToken, revenueDay)
router.get('/renevue-month', protect, verifyAccessToken, revenueMonth)
router.get('/renevue-year', protect, verifyAccessToken, revenueYear)

export default router
