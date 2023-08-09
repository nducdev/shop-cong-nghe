import asyncHandler from 'express-async-handler'
import Delivery from '../../models/delivery.model.js'

const findDelivery = asyncHandler(async (req, res) => {
    const { userID } = req.body

    if (!userID) {
        res.status(400)
        throw new Error('Please enter the userID')
    }

    const delivery = await Delivery.find({ userID: userID }).sort({ createdAt: -1 }).exec()

    if (delivery.length === 0) {
        res.status(200).json({
            status: 'success',
            data: false,
            message: 'User not have any delivery.'
        })
    } else {
        res.status(200).json({
            status: 'success',
            data: {
                delivery
            }
        })
    }
})

export default findDelivery
