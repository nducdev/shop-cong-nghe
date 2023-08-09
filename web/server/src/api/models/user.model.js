import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            minLength: [6, 'Password must be up to 6 characters.']
            // maxLength: [30, 'Password must be not more than 30 characters.']
        },
        confirmpassword: {
            type: String,
            minLength: [6, 'Password must be up to 6 characters.']
            // maxLength: [30, 'Password must be not more than 30 characters.']
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        phone: {
            type: Number,
            required: true
        },
        role: {
            type: String,
            enum: ['admin', 'mod', 'user'],
            default: 'user'
        },
        avatar: {
            type: String,
            default: 'https://i.ibb.co/4pDNDk1/avatar.png'
        }
    },
    {
        timestamps: true
    }
)

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }

    // hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    next()
})

const User = mongoose.model('User', UserSchema)

export default User
