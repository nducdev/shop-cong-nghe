import asyncHandler from 'express-async-handler'
import bcrypt from 'bcryptjs'
import User from '../../models/user.model.js'
import client from '../../../configs/database/db.redis.js'

import { generateAccessToken, generateRefreshToken } from '../../../utils/jwt/generateToken.util.js'

const loginAdmin = asyncHandler(async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) {
        res.status(400)
        throw new Error('Please fill in all the required fields.')
    }

    const user = await User.findOne({ username })

    if (!user) {
        res.status(404)
        throw new Error('User not found!')
    }

    if (user.role !== 'admin') {
        res.status(403)
        throw new Error("You don't have permission!")
    }

    const passwordIsCorrect = await bcrypt.compare(password, user.password)

    if (user.role === 'admin' && passwordIsCorrect) {
        const { _id, username, avatar, role } = user

        const accessToken = await generateAccessToken(user._id, role)
        const refreshToken = await generateRefreshToken(user._id, role)

        req.session.token = refreshToken
        res.cookie('refreshToken1', refreshToken, {
            httpOnly: true,
            secure: false,
            maxAge: 30 * 24 * 60 * 60 * 1000,
            sameSite: 'strict'
        })
        res.setHeader('Authorization', accessToken)

        res.status(200).json({
            status: 'success',
            data: {
                _id,
                username,
                role,
                avatar
            },
            accessToken: accessToken
        })
    } else if (!passwordIsCorrect) {
        const ip = req.ip || req.headers['x-forwarded-for']

        // block user after 5 failed login attempts
        const attempts = await new Promise((resolve, reject) => {
            client.incr(`failed-login-attemps:${ip}`, (err, result) => {
                if (err) reject(err)

                if (result === 1) {
                    client.expire(`failed-login-attemps:${ip}`, 2 * 60 * 59, (error) => {
                        if (error) return next(error)
                    })
                }
                resolve(result)
            })
        })

        if (attempts <= 5) {
            res.status(400)
            throw new Error('Invalid password or email')
        }

        if (attempts > 5) {
            await new Promise((resolve, reject) => {
                client.set(`is-blocked:${ip}`, 'True', 'EX', 2 * 60 * 60, (err) => {
                    if (err) reject(err)
                    resolve()
                })
            })
        }
    } else {
        res.status(400)
        throw new Error('Invalid password or username')
    }
})

export default loginAdmin
