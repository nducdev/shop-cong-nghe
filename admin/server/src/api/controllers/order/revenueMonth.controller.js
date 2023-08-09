import asyncHandler from 'express-async-handler'
import Order from '../../models/order.model.js'

const revenueMonth = asyncHandler(async (_req, res) => {
    const currentDate = new Date()
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0, 23, 59, 59)

    const sumOfRevenue = await Order.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: startOfMonth,
                    $lt: endOfMonth
                }
            }
        },
        {
            $group: {
                _id: null,
                totalRevenue: { $sum: '$price' } // Make sure '$price' matches your schema field name
            }
        }
    ])

    console.log(sumOfRevenue)

    res.status(200).json({
        status: 'success',
        data: {
            revenue: sumOfRevenue
        }
    })
})

export default revenueMonth
