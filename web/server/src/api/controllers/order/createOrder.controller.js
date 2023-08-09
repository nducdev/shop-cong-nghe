import asyncHandler from 'express-async-handler'
import Order from '../../models/order.model.js'
import Product from '../../models/product.model.js'

const createOrder = asyncHandler(async (req, res) => {
    const { userID, deliveryID, productID, name, price, image, quantity, pay_method } = req.body

    if (!userID || !deliveryID || !productID || !image || !name || !price || !quantity || !pay_method) {
        res.status(400)
        throw new Error('Please fill in all the required fields.')
    }

    const order = await Order.create({
        userID: userID,
        deliveryID: deliveryID,
        productID: productID,
        name: name,
        price: price,
        quantity: quantity,
        pay_method: pay_method,
        image: image
    })

    if (order) {
        const productItem = await Product.findById(productID).exec()

        await productItem.updateOne({
            item: productItem.item - quantity
        })

        res.status(200).json({
            status: 'success',
            data: {
                order
            }
        })
    } else {
        res.status(200)
        throw new Error('Invalid Data.')
    }
})

export default createOrder
