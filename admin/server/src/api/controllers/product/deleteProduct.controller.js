import asyncHandler from 'express-async-handler'
import Product from '../../models/product.model.js'

const deleteProduct = asyncHandler(async (req, res) => {
    const { productID } = req.body
    const product = await Product.findById(productID)

    if (!product) {
        res.status(404)
        throw new Error('Product not found')
    } else {
        await product.deleteOne()

        res.status(200).json({
            status: 'success',
            message: 'Product deleted successfully.'
        })
    }
})

export default deleteProduct
