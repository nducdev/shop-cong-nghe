const UPDATE_USER_URL = '/api/v1/user/update-user'
const UPLOAD_IMAGE_URL = '/api/v1/upload-image/image'
const CHANGE_PWD_URL = '/api/v1/user/change-password'

export const updateUser = async (data, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.put(UPDATE_USER_URL, data, {
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

export const uploadImage = async (data, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.post(UPLOAD_IMAGE_URL, data, {
            headers: {
                Authorization: accessToken,
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        })

        return res?.data
    } catch (error) {
        console.log(error)
        return error
    }
}

export const changePwd = async (data, accessToken, axiosJWT) => {
    try {
        const res = await axiosJWT.put(CHANGE_PWD_URL, data, {
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
