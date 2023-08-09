import './login.scss'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { loginAdmin } from '../../api/authApi'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const auth = useSelector((state) => state.auth.login.currentUser)

    const navigate = useNavigate()

    useEffect(() => {
        if (auth !== null) {
            navigate('/')
        }
    }, [auth, navigate])

    const dispatch = useDispatch()

    const [user, setUser] = useState('')
    const [pwd, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const data = JSON.stringify({
                username: user,
                password: pwd
            })

            const res = await loginAdmin(data, dispatch, navigate)

            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="login-container">
            <div className="login-board-wrapper">
                <div className="login-header">
                    <span>Login</span>
                </div>
                <div className="login-content">
                    <form onSubmit={handleSubmit}>
                        <div className="text-field">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                id="username"
                                onChange={(e) => setUser(e.target.value)}
                                value={user}
                                required
                            />
                        </div>
                        <div className="text-field">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                id="password"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                            />
                        </div>
                        <button>Login</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
