import asyncHandler from 'express-async-handler'
import Product from '../../models/product.model.js'

const createProduct = asyncHandler(async (req, res) => {
    const { name, desc, image, type, item, price, brand, detail } = req.body

    console.log(req.body)

    // if (!name || !desc || !image || !type || !item || !price || !brand || !detail) {
    //     res.status(400)
    //     throw new Error('Please fill in all the required fields.')
    // }

    const product = await Product.create({
        name: name,
        desc: desc,
        item: item,
        type: type,
        price: price,
        image: image,
        brand: brand,
        detail: detail
    })

    if (product) {
        const { name, desc, image, type, price, brand, detail } = product
        res.status(200).json({
            status: 'success',
            data: {
                name,
                desc,
                image,
                type,
                item,
                brand,
                price,
                detail
            }
        })
    } else {
        res.status(500)
        throw new Error('Invalid product data.')
    }
})

export default createProduct
