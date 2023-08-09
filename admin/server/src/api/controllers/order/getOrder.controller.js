import asyncHandler from 'express-async-handler'
import Order from '../../models/order.model.js'
import User from '../../models/user.model.js'

const getAllOrder = asyncHandler(async (req, res) => {
    const skip = req.query.skip ? Number(req.query.skip) : 9
    const DEFAULT_LIMIT = 9

    const orders = await Order.find().skip(skip).limit(DEFAULT_LIMIT).sort({ createdAt: -1 }).exec()
    const count = await Order.countDocuments().exec()

    if (orders) {
        const userID = orders.map((order) => order.userID)
        const user = await User.find({ _id: userID }).select({
            password: 0,
            email: 0,
            phone: 0,
            role: 0
        })

        res.status(200).json({
            status: 'success',
            data: {
                orderData: orders,
                userData: user,
                count: count
            }
        })
    } else {
        res.status(500)
        throw new Error('Server error')
    }
})

export default getAllOrder
