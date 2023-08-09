import express from 'express'
import getProduct from '../../controllers/product/getProduct.controller.js'
import getAllProduct from '../../controllers/product/getAllProduct.controlller.js'
import findProductWithField from '../../controllers/product/findProductWithField.controller.js'
import findProductByType from '../../controllers/product/findProductByType.controller.js'

const router = express.Router()

router.get('/products', getAllProduct)
router.post('/detail-product', getProduct)
router.post('/find-product-field', findProductWithField)
router.post('/find-product-type', findProductByType)

export default router
