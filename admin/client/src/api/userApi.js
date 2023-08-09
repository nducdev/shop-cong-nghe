const GET_ALL_USER = '/api/v1/user/users'
const GET_DETAIL_USER = '/api/v1/user/detail-user'
const DELETE_USER = '/api/v1/user/delete-user'

export const getAllUser = async (accessToken, axiosJWT, skip = 0) => {
    try {
        const res = await axiosJWT.get(`${GET_ALL_USER}?skip=${skip}`, {
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

export const getDetailUser = async (data, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.post(GET_DETAIL_USER, data, {
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

export const deleteUser = async (data, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.post(DELETE_USER, data, {
            headers: {
                Authorization: accessToken,
                'Content-Type': 'application/json'
            },
            withCredentials: true
        })

        return res
    } catch (error) {
        console.log(error)
    }
}
