import axios from './axios'

const GET_ALL_PRODUCT_URL = '/api/v1/product/products'
const GET_PRODUCT_URL = '/api/v1/product/detail-product'
const FIND_PRODUCT_FIELD_URL = '/api/v1/product/find-product-field'
const FIND_PRODUCT_TYPE_URL = '/api/v1/product/find-product-type'

export const getAllProducts = async (skip) => {
    try {
        const res = await axios.get(`${GET_ALL_PRODUCT_URL}?skip=${skip}`, {
            withCredentials: true
        })

        console.log(res)
        return res?.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const getProductDetail = async (data) => {
    try {
        const res = await axios.post(GET_PRODUCT_URL, data, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })

        return res?.data
    } catch (error) {
        console.log(error)
    }
}

export const findProductWithField = async (data) => {
    try {
        const res = await axios.post(FIND_PRODUCT_FIELD_URL, data, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })

        return res?.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const findProductByType = async (data, skip) => {
    try {
        const res = await axios.post(`${FIND_PRODUCT_TYPE_URL}?skip=${skip}`, data, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })

        return res?.data
    } catch (error) {
        console.log(error)
        return error
    }
}
