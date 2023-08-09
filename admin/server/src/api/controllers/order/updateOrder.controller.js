import asyncHandler from 'express-async-handler'
import Order from '../../models/order.model.js'

const updateOrder = asyncHandler(async (req, res) => {
    const { orderID, state } = req.body

    const order = await Order.findById(orderID)

    if (!orderID || !state) {
        res.status(400)
        throw new Error('Please fill in the required field.')
    }

    if (order) {
        const { state } = order

        order.state = req.body.state || state

        const updatedOrder = await order.save()

        if (updatedOrder) {
            res.status(200).json({
                status: 'success',
                data: {
                    state: updatedOrder.state
                }
            })
        } else {
            res.status(400)
            throw new Error('Invalid order data')
        }
    }
})

export default updateOrder
