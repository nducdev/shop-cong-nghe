import asyncHandler from 'express-async-handler'
import Cart from '../../models/cart.model.js'

const deleteCart = asyncHandler(async (req, res) => {
    const { cartID } = req.body

    console.log(cartID)

    if (!cartID) {
        res.status(400)
        throw new Error('Please fill in the required field.')
    }

    const cart = await Cart.findById(cartID).exec()

    if (!cart) {
        res.status(404)
        throw new Error('Cart not found')
    } else {
        cart.deleteOne()

        res.status(200).json({
            status: 'success',
            data: {
                message: 'Deleted successfully'
            }
        })
    }
})

export default deleteCart
