import asyncHandler from 'express-async-handler'
import Cart from '../../models/cart.model.js'

const addCart = asyncHandler(async (req, res) => {
    const { userID, productID } = req.body

    if (!userID || !productID) {
        res.status(400)
        throw new Error('Please enter all the required fields.')
    }

    const cart = await Cart.create({
        userID: userID,
        productID: productID
    })

    if (cart) {
        res.status(200).json({
            status: 'success',
            data: {
                cart
            }
        })
    } else {
        res.status(400)
        throw new Error('Invalid cart data.')
    }
})

export default addCart
