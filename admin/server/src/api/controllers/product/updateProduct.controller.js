import asyncHandler from 'express-async-handler'
import Product from '../../models/product.model.js'

const updateProduct = asyncHandler(async (req, res) => {
    const productID = req.params.productID
    const product = await Product.findById(productID)

    if (!product) {
        res.status(404)
        throw new Error('Product not found')
    } else {
        const { name, desc, image, item, price, brand } = product

        product.name = req.body.name || name
        product.desc = req.body.desc || desc
        product.image = req.body.image || image
        product.item = req.body.item || item
        product.price = req.body.price || price
        product.brand = req.body.brand || brand

        const updatedProduct = await product.save()

        if (updatedProduct) {
            res.status(200).json({
                status: 'success',
                data: {
                    name: updatedProduct.name,
                    desc: updatedProduct.desc,
                    image: updatedProduct.image,
                    item: updatedProduct.item,
                    price: updatedProduct.price,
                    brand: updatedProduct.brand
                }
            })
        } else {
            res.status(400)
            throw new Error('Invalid product data')
        }
    }
})

export default updateProduct
