import asyncHandler from 'express-async-handler'
import Cart from '../../models/cart.model.js'

const countCart = asyncHandler(async (req, res) => {
    const { userID } = req.body

    const count = await Cart.countDocuments({ userID: userID })

    if (count === 0 || count) {
        res.status(200).json({
            status: 'success',
            data: {
                count
            }
        })
    } else {
        res.status(500)
        throw new Error('Server error')
    }
})

export default countCart
