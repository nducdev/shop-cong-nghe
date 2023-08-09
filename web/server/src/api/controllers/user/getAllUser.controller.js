import asyncHandler from 'express-async-handler'
import User from '../../models/user.model.js'

const getAllUser = asyncHandler(async (req, res) => {
    const skip = req.query.skip ? Number(req.query.skip) : 0
    const DEFAULT_LIMIT = 9

    const users = await User.find({ $or: [{ role: { $exists: false } }, { role: { $ne: 'admin' } }] })
        .select({ password: 0 })
        .skip(skip)
        .limit(DEFAULT_LIMIT)
        .sort({ createdAt: -1 })
        .exec()

    const count = await User.countDocuments({
        $or: [{ role: { $exists: false } }, { role: { $ne: 'admin' } }]
    }).exec()

    if (users) {
        res.status(200).json({
            status: 'success',
            data: {
                userData: users,
                count: count
            }
        })
    } else {
        res.status(500)
        throw new Error('Server error')
    }
})

export default getAllUser
