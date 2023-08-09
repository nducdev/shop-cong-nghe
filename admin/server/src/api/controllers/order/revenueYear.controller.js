import asyncHandler from 'express-async-handler'
import Order from '../../models/order.model.js'

const revenueYear = asyncHandler(async (_req, res) => {
    const currentYear = new Date().getFullYear()

    const startOfYear = new Date(currentYear, 0, 1)
    const endOfYear = new Date(currentYear, 11, 31, 23, 59, 59)

    const sumOfRevenue = await Order.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: startOfYear,
                    $lt: endOfYear
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

export default revenueYear
