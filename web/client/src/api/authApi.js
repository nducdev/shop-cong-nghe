import axios from './axios'
import {
    loginFailed,
    loginStart,
    loginSuccess,
    registerStart,
    registerFailed,
    registerSuccess,
    logoutStart,
    logoutSuccess,
    logoutFailed
} from '../redux/slices/authSlice'

const LOGIN_URL = '/api/v1/auth/login'
const REGISTER_URL = '/api/v1/auth/register'
const LOGOUT_URL = '/api/v1/auth/logout'

export const loginUser = async (data, dispatch, navigate) => {
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

export const registerUser = async (data, dispatch, navigate) => {
    dispatch(registerStart())

    try {
        const res = await axios.post(REGISTER_URL, data, {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        })

        dispatch(registerSuccess())
        navigate('/login')

        return res.data
    } catch (error) {
        dispatch(registerFailed())
        return error
    }
}

export const logoutUser = async (dispatch, navigate, accessToken, axiosJWT) => {
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
        navigate('/login')
    } catch (error) {
        dispatch(logoutFailed())
    }
}
