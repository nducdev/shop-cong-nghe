const CREATE_DELIVERY_URL = '/api/v1/order/create-delivery'
const CREATE_ORDER_URL = '/api/v1/order/create-order'
const FIND_DELIVERY_URL = '/api/v1/order/find-delivery'
const FIND_ORDER_URL = '/api/v1/order/find-order'
const UPDATE_DELIVERY_URL = '/api/v1/order/update-delivery'

export const deliveryApi = async (data, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.post(CREATE_DELIVERY_URL, data, {
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

export const orderApi = async (data, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.post(CREATE_ORDER_URL, data, {
            headers: {
                Authorization: accessToken,
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })

        console.log('res', res)

        return res?.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const findDelivery = async (accessToken, axiosJWT, data) => {
    try {
        const res = await axiosJWT.post(FIND_DELIVERY_URL, data, {
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

export const updateDelivery = async (accessToken, axiosJWT, data) => {
    try {
        const res = await axiosJWT.put(UPDATE_DELIVERY_URL, data, {
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

export const findOrder = async (data, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.post(FIND_ORDER_URL, data, {
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
