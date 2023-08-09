const ADD_CART_URL = '/api/v1/cart/add-cart'
const COUNT_CART_URL = '/api/v1/cart/count-cart'
const FIND_CART_URL = '/api/v1/cart/find-cart'
const DELETE_CART_URL = '/api/v1/cart/delete-cart'

export const addCart = async (accessToken, axiosJWT, data) => {
    try {
        const res = await axiosJWT.post(ADD_CART_URL, data, {
            headers: {
                Authorization: accessToken,
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

export const countCart = async (accessToken, axiosJWT, data) => {
    try {
        const res = await axiosJWT.post(COUNT_CART_URL, data, {
            headers: {
                Authorization: accessToken,
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

export const findCart = async (accessToken, axiosJWT, data, skip = 0) => {
    try {
        const res = await axiosJWT.post(`${FIND_CART_URL}?skip=${skip}`, data, {
            headers: {
                Authorization: accessToken,
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

export const deleteCart = async (accessToken, axiosJWT, data) => {
    try {
        const res = await axiosJWT.post(DELETE_CART_URL, data, {
            headers: {
                Authorization: accessToken,
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
