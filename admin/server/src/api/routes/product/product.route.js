import express from 'express'
import protect from '../../middlewares/auth.middleware.js'
import getProduct from '../../controllers/product/getProduct.controller.js'
import createProduct from '../../controllers/product/createProduct.controller.js'
import updateProduct from '../../controllers/product/updateProduct.controller.js'
import deleteProduct from '../../controllers/product/deleteProduct.controller.js'
import getAllProduct from '../../controllers/product/getAllProduct.controlller.js'
import { validateParam } from '../../../validator/params.validator.js'
import { schemas } from '../../../validator/schemas.js'
import { verifyAccessToken } from '../../../utils/jwt/verifyToken.utils.js'
import checkRole from '../../middlewares/checkRole.middleware.js'

const router = express.Router()

router.get('/products', getAllProduct)
router.post('/detail-product', getProduct)
router.post('/create-product', protect, verifyAccessToken, checkRole(['admin']), createProduct)
router.put(
    '/:productID',
    validateParam(schemas.idSchema, 'productID'),
    protect,
    verifyAccessToken,
    checkRole(['admin']),
    updateProduct
)
router.post('/delete-product', protect, verifyAccessToken, checkRole(['admin']), deleteProduct)

export default router
