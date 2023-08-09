import asyncHandler from 'express-async-handler'
import key from '../../../configs/secretKey.cjs'
import User from '../../models/user.model.js'

// @desc Update
// @route PUT /update
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const { username, email } = req.body

    const user = await User.findById(req.user._id)
    const usernameExists = await User.findOne({ username })
    const emailExists = await User.findOne({ email })

    if (user) {
        const { username, email, name, gender, phone, avatar } = user

        if (usernameExists) {
            res.status(400)
            throw new Error('This username has been taken.')
        } else {
            user.username = req.body.username || username
        }

        if (emailExists) {
            res.status(400)
            throw new Error('This email has been taken.')
        } else {
            user.email = req.body.email || email
        }

        if (req.body.avatar && req.body.avatar.length > 0) {
            user.avatar = req.body.avatar || avatar
        }

        user.name = req.body.name || name
        user.gender = req.body.gender || gender
        user.phone = req.body.phone || phone

        const updatedUser = await user.save()

        console.log('pre', user.avatar)
        console.log('update', updatedUser.avatar)

        if (updatedUser) {
            res.status(200).json({
                status: 'success',
                data: {
                    username: updatedUser.username,
                    email: updatedUser.email,
                    name: updatedUser.name,
                    gender: updatedUser.gender,
                    phone: updatedUser.phone,
                    avatar: updatedUser.avatar
                }
            })
        } else {
            res.status(400)
            throw new Error('Invalid user data')
        }
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

export default updateUser
