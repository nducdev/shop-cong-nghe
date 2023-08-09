import asyncHandler from 'express-async-handler'
import Product from '../../models/product.model.js'

const findProductByType = asyncHandler(async (req, res) => {
    const { type } = req.body
    const DEFAULT_LIMIT = 12

    if (!type) {
        res.status(400)
        throw new Error('Please enter all the required fields.')
    }

    const products = await Product.find({ type: type }).limit(DEFAULT_LIMIT).exec()
    const count = await Product.countDocuments({ type: type }).exec()

    if (products) {
        res.status(200).json({
            status: 'success',
            data: {
                products,
                count
            }
        })
    } else {
        res.status(500)
        throw new Error('Server Error')
    }
})

export default findProductByType
