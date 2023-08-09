import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import User from '../../models/user.model.js'

const changePassword = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (!user) {
        res.status(404)
        throw new Error('User not found, please signup!')
    }

    const { oldPassword, password } = req.body

    if (!oldPassword || !password) {
        res.status(400)
        throw new Error('Please enter all requirement fields!')
    }

    const passwordIsCorrect = await bcrypt.compare(oldPassword, user.password)

    if (user && passwordIsCorrect) {
        user.password = password
        await user.save()
        res.status(200).json({
            status: 'success',
            data: {
                message: 'Password changed successfully.'
            }
        })
    } else {
        res.status(400)
        throw new Error('Old password is incorrect.')
    }
})

export default changePassword
