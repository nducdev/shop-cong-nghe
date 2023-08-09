import axios from './axios'

const GET_ALL_PRODUCT = '/api/v1/product/products'
const DELETE_PRODUCT = '/api/v1/product/delete-product'
const CREATE_PRODUCT = '/api/v1/product/create-product'

export const getAllProduct = async (skip = 0) => {
    try {
        const res = await axios.get(`${GET_ALL_PRODUCT}?skip=${skip}`, {
            withCredentials: true
        })

        return res?.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const deleteProduct = async (data, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.post(DELETE_PRODUCT, data, {
            headers: {
                Authorization: accessToken,
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })

        return res
    } catch (error) {
        console.log(error)
        return error
    }
}

export const createProduct = async (data, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.post(CREATE_PRODUCT, data, {
            headers: {
                Authorization: accessToken,
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })

        return res
    } catch (error) {
        console.log(error)
        return error
    }
}
