const GET_ORDER_URL = '/api/v1/order/orders'
const UPDATE_ORDER = '/api/v1/order/update-order'
const CANCEL_ORDER = '/api/v1/order/cancel-order'
const RENEVUE_YEAR_URL = '/api/v1/order/renevue-year'
const RENEVUE_MONTH_URL = '/api/v1/order/renevue-month'
const RENEVUE_DAY_URL = '/api/v1/order/renevue-day'

export const getAllOrder = async (accessToken, axiosJWT, skip = 0) => {
    try {
        const res = await axiosJWT.get(`${GET_ORDER_URL}?skip=${skip}`, {
            headers: {
                Authorization: accessToken
            },
            withCredentials: true
        })

        return res?.data
    } catch (error) {
        console.log(error)
    }
}

export const updateOrder = async (data, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.put(UPDATE_ORDER, data, {
            headers: {
                Authorization: accessToken,
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })

        return res?.data
    } catch (error) {
        console.log(error)
    }
}

export const cancelOrder = async (data, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.post(CANCEL_ORDER, data, {
            headers: {
                Authorization: accessToken,
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })

        console.log(res)

        return res
    } catch (error) {
        console.log(error)
        return error
    }
}

export const renevueYear = async (accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get(RENEVUE_YEAR_URL, {
            headers: {
                Authorization: accessToken
            },
            withCredentials: true
        })

        return res?.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const renevueMonth = async (accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get(RENEVUE_MONTH_URL, {
            headers: {
                Authorization: accessToken
            },
            withCredentials: true
        })

        return res?.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const renevueDay = async (accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.get(RENEVUE_DAY_URL, {
            headers: {
                Authorization: accessToken
            },
            withCredentials: true
        })

        return res?.data
    } catch (error) {
        console.log(error)
        return error
    }
}
