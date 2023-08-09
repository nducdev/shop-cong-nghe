import asyncHandler from 'express-async-handler'
import Product from '../../models/product.model.js'

const getAllProduct = asyncHandler(async (req, res) => {
    const skip = req.query.skip ? Number(req.query.skip) : 0
    const DEFAULT_LIMIT = 12

    const products = await Product.find().skip(skip).limit(DEFAULT_LIMIT).sort({ createdAt: -1 }).exec()
    const count = await Product.countDocuments().exec()

    if (products) {
        res.status(200).json({
            status: 'success',
            data: {
                productData: products,
                count: count
            }
        })
    } else {
        res.status(400)
        throw new Error('No product found')
    }
})

export default getAllProduct
