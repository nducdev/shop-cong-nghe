import mongoose from 'mongoose'

const OrderSchema = new mongoose.Schema(
    {
        userID: {
            type: String,
            required: true
        },
        deliveryID: {
            type: String,
            required: true
        },
        productID: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        pay_method: {
            type: String,
            enum: ['cash on delivery', 'shopcart card', 'paypal', 'credit']
        },
        state: {
            type: String,
            enum: ['pending', 'in progress', 'delivered'],
            default: 'pending'
        }
    },
    {
        timestamps: true
    }
)

const Order = mongoose.model('Order', OrderSchema)

export default Order
