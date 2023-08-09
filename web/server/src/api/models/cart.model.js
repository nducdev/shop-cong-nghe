import mongoose from 'mongoose'

const CartSchema = new mongoose.Schema(
    {
        userID: {
            type: String,
            required: true
        },
        productID: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
)

const Cart = mongoose.model('Cart', CartSchema)

export default Cart
