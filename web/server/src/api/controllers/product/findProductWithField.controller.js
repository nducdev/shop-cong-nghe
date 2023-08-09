import asyncHandler from 'express-async-handler'
import Product from '../../models/product.model.js'

const findProductWithField = asyncHandler(async (req, res) => {
    const { brand } = req.body
    const DEFAULT_LIMIT = 6

    if (!brand) {
        res.status(400)
        throw new Error('Please enter all the required fields.')
    }

    const products = await Product.find({ brand: brand }).limit(DEFAULT_LIMIT).exec()

    if (products) {
        res.status(200).json({
            status: 'success',
            data: {
                products
            }
        })
    } else {
        res.status(500)
        throw new Error('Server Error')
    }
})

export default findProductWithField
