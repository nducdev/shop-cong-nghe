import asyncHandler from 'express-async-handler'
import User from '../../models/user.model.js'

// @desc Delete
// @route DELETE /delete
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    const { userID } = req.body

    if (!userID) {
        res.status(400)
        throw new Error('Please enter the userID.')
    }

    const user = await User.findById(userID)

    if (!user) {
        res.status(404)
        throw new Error('User not found.')
    }

    if (user) {
        await user.deleteOne()
        res.status(200).json({
            status: 'success',
            message: 'User deleted successfully'
        })
    } else {
        res.status(400)
        throw new Error('Password is incorrect.')
    }
})

export default deleteUser
