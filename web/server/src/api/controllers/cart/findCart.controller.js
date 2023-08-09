import asyncHandler from 'express-async-handler'
import Cart from '../../models/cart.model.js'
import Product from '../../models/product.model.js'

const findCart = asyncHandler(async (req, res) => {
    const skip = req.query.skip ? Number(req.query.skip) : 0
    const DEFAULT_LIMIT = 10
    const { userID } = req.body

    if (!userID) {
        res.status(400)
        throw new Error('Please enter all the required fields.')
    }

    const carts = await Cart.find({ userID: userID })
        .skip(skip)
        .limit(DEFAULT_LIMIT)
        .sort({ createdAt: -1 })
        .exec()

    if (carts) {
        const productID = carts.map((product) => product.productID)
        const products = await Product.find({ _id: productID })

        res.status(200).json({
            status: 'success',
            data: {
                cartID: carts,
                productData: products
            }
        })
    } else {
        res.status(200).json({
            message: "You don't have any product in cart"
        })
    }
})

export default findCart
