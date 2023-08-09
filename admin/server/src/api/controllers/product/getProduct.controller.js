import asyncHandler from 'express-async-handler'
import Product from '../../models/product.model.js'

const getProduct = asyncHandler(async (req, res) => {
    const { productID } = req.body

    if (!productID) {
        res.status(400)
        throw new Error('Please enter the productID')
    }

    const product = await Product.findById(productID)

    if (product) {
        res.status(200).json({
            status: 'success',
            data: {
                product
            }
        })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

export default getProduct
