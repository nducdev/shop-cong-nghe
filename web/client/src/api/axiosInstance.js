import axios from './axios'
import jwtDecode from 'jwt-decode'

const REFRESH_TOKEN_URL = '/api/v1/user/refresh-token'

const refreshToken = async () => {
    try {
        const res = await axios.post(
            REFRESH_TOKEN_URL,
            {},
            {
                withCredentials: true
            }
        )
        return res.data
    } catch (error) {
        console.log(error)
    }
}

export const createAxios = (auth, dispatch, stateSuccess) => {
    const newInstance = axios.create({
        baseURL: 'http://localhost:5001'
    })

    newInstance.interceptors.request.use(
        async (config) => {
            const currentTime = new Date()
            const decoded = jwtDecode(auth?.accessToken)

            if (decoded?.exp < currentTime.getTime() / 1000) {
                const data = await refreshToken()
                const refreshUser = {
                    ...auth,
                    accessToken: data.accessToken
                }
                dispatch(stateSuccess(refreshUser))
                config.headers['Authorization'] = data?.accessToken
            }

            return config
        },
        (err) => {
            return Promise.reject(err)
        }
    )

    return newInstance
}
