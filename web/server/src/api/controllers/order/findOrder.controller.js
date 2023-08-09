import asyncHandler from 'express-async-handler'
import Order from '../../models/order.model.js'

const findOrder = async (req, res) => {
    const { userID } = req.body

    if (!userID) {
        res.status(400)
        throw new Error('Please enter the userID')
    }

    const order = await Order.find({ userID: userID }).sort({ createdAt: -1 }).exec()

    if (order.length === 0) {
        res.status(200).json({
            status: 'success',
            data: false,
            message: 'User not have any order.'
        })
    } else {
        res.status(200).json({
            status: 'success',
            data: {
                order
            }
        })
    }
}

export default findOrder
