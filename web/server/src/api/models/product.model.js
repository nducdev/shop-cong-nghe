import mongoose from 'mongoose'

const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        desc: {
            type: String,
            required: true
        },
        item: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        type: {
            type: String,
            enum: ['phone', 'pc', 'phukien', 'tivi', 'other'],
            required: true
        },
        image: {
            type: [String],
            required: true,
            validate: {
                validator: function (images) {
                    return images.length === 4
                },
                message: 'Exactly 4 images are required.'
            }
        },
        brand: {
            type: String,
            required: true
        },
        detail: {
            type: String,
            required: true
        },
        review: []
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model('Product', ProductSchema)

export default Product
