import User from '../models/user.model.js'

const checkRole = (permission) => {
    return async (req, res, next) => {
        if (!req.user._id) {
            res.status(403)
            throw new Error('You have to login.')
        }

        const user = await User.findById(req.user._id).select({ password: 0 })

        console.log(user)

        if (!user) {
            res.status(404)
            throw new Error('User not found!')
        }

        const { role } = user

        console.log(role)

        if (!permission.includes(role)) {
            res.status(401)
            throw new Error("You don't have permission!")
        }

        next()
    }
}

export default checkRole
