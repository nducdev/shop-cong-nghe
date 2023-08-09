import asyncHandler from 'express-async-handler'
import Delivery from '../../models/delivery.model.js'

const createDelivery = asyncHandler(async (req, res) => {
    const { firstname, lastname, address, city, zipcode, email, phone } = req.body

    if (!firstname || !lastname || !address || !city || !zipcode || !email || !phone) {
        res.status(400)
        throw new Error('Please fill in all the required fields.')
    }

    const delivery = await Delivery.create({
        firstname: firstname,
        lastname: lastname,
        email: email,
        phone: phone,
        city: city,
        zipcode: zipcode,
        address: address
    })

    if (delivery) {
        res.status(200).json({
            status: 'success',
            data: {
                delivery
            }
        })
    } else {
        res.status(400)
        throw new Error('Invalid Data.')
    }
})

export default createDelivery
