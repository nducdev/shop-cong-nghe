import asyncHandler from 'express-async-handler'
import Order from '../../models/order.model.js'

const cancelOrder = asyncHandler(async (req, res) => {
    try {
        const { orderID } = req.body

        const order = await Order.findById(orderID)

        if (!order) {
            res.status(404)
            throw new Error('Order not found')
        } else {
            await order.deleteOne()

            res.status(200).json({
                status: 'success',
                message: 'Order deleted successfully.'
            })
        }
    } catch (error) {
        console.log(error)
    }
})

export default cancelOrder
