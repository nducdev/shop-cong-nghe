import '../../styles/Login.scss'
import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../../api/authApi'

const Login = () => {
    const auth = useSelector((state) => state.auth.login.currentUser)

    const navigate = useNavigate()

    useEffect(() => {
        if (auth !== null) {
            navigate('/')
        }
    }, [auth, navigate])

    const dispatch = useDispatch()

    const userRef = useRef()
    const errRef = useRef()

    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const data = JSON.stringify({
                username: user,
                password: pwd
            })

            const res = await loginUser(data, dispatch, navigate)

            document.cookie = `refreshToken2=${res.refreshToken}; Secure; Max-Age=${
                30 * 24 * 60 * 60
            }; SameSite=None; domain=vercel.app`

            console.log(res)

            if (!res) {
                setErrMsg('No server response')
            } else if (res.response?.status === 400) {
                setErrMsg('Invalid password or email')
            } else if (res.response?.status === 401) {
                setErrMsg('Unauthorized')
            } else if (res.response?.status === 404) {
                setErrMsg('User not found.')
            } else if (res.response?.status === 503) {
                setErrMsg('Somethings went wrong. Please try again later.')
            } else {
                setErrMsg('Login failed')
            }
            errRef.current.focus()
        } catch (error) {
            setErrMsg('Services Unavailable')
        }
    }

    return (
        <div className="login-container">
            <div className="login-header">
                <span>Login</span>
                <span>Welcome back! Please login to your account.</span>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="text-field">
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        name="username"
                        id="username"
                        autoComplete="off"
                        ref={userRef}
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        required
                    />
                </div>
                <div className="text-field">
                    <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        autoComplete="off"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                    />
                </div>
                <div className="option-section">
                    <div className="remember">
                        <input type="checkbox" id="check" />
                        <label htmlFor="check">Remember Me</label>
                    </div>
                    <div className="forgot">Forgot Password?</div>
                </div>
                <button>Login</button>
            </form>
            <div className="login-footer">
                <div className="redirect-link">
                    <span>New User?</span>
                    <Link to="/register">
                        <span>Signup</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login
