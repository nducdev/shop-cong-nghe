import asyncHandler from 'express-async-handler'
import Order from '../../models/order.model.js'

const revenueDay = asyncHandler(async (_req, res) => {
    const currentDate = new Date()
    const startOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
    const endOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1)

    const sumOfRevenue = await Order.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: startOfDay,
                    $lt: endOfDay
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

export default revenueDay
