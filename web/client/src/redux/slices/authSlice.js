import { createSlice } from '@reduxjs/toolkit'

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        login: {
            currentUser: null,
            isFetching: false,
            error: false
        },
        register: {
            success: false,
            isFetching: false,
            error: false
        }
    },
    reducers: {
        // login
        loginStart: (state) => {
            state.login.isFetching = true
        },
        loginSuccess: (state, action) => {
            state.login.isFetching = false
            state.login.currentUser = action.payload
            state.login.error = false
        },
        loginFailed: (state) => {
            state.login.isFetching = false
            state.login.error = true
        },

        // register
        registerStart: (state) => {
            state.register.isFetching = true
        },
        registerSuccess: (state) => {
            state.register.isFetching = false
            state.register.success = true
            state.register.error = false
        },
        registerFailed: (state) => {
            state.register.isFetching = false
            state.register.error = true
            state.register.success = false
        },

        // logout
        logoutStart: (state) => {
            state.login.isFetching = true
        },
        logoutSuccess: (state) => {
            state.login.isFetching = false
            state.login.currentUser = null
            state.login.error = false
        },
        logoutFailed: (state) => {
            state.login.isFetching = false
            state.login.error = true
        }
    }
})

export const {
    loginStart,
    loginFailed,
    loginSuccess,
    registerStart,
    registerFailed,
    registerSuccess,
    logoutStart,
    logoutSuccess,
    logoutFailed
} = authSlice.actions

export default authSlice.reducer
