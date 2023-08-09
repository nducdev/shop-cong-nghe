import axios from './axios'
import {
    loginFailed,
    loginStart,
    loginSuccess,
    logoutStart,
    logoutSuccess,
    logoutFailed
} from '../redux/slices/authSlice'

const LOGIN_URL = '/api/v1/auth/loginAdmin'
const LOGOUT_URL = '/api/v1/auth/logout'

export const loginAdmin = async (data, dispatch, navigate) => {
    dispatch(loginStart())

    try {
        const res = await axios.post(LOGIN_URL, data, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        })

        dispatch(loginSuccess(res?.data))
        navigate('/')

        return res.data
    } catch (error) {
        dispatch(loginFailed())
        return error
    }
}

export const logoutAdmin = async (dispatch, accessToken, axiosJWT) => {
    dispatch(logoutStart())

    try {
        const res = await axiosJWT.post(
            LOGOUT_URL,
            {},
            {
                headers: {
                    Authorization: accessToken
                },
                withCredentials: true
            }
        )

        console.log(res)

        dispatch(logoutSuccess())
    } catch (error) {
        dispatch(logoutFailed)
    }
}
