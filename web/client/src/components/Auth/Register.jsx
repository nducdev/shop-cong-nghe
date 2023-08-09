import '../../styles/Register.scss'
import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../../api/authApi'

const Register = () => {
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
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [errMsg, setErrMsg] = useState('')

    useEffect(() => {
        userRef.current.focus()
    }, [])

    // useEffect(() => {
    // }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('')
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const data = JSON.stringify({
                username: user,
                password: pwd,
                email: email,
                name: name,
                phone: phone
            })

            const res = await registerUser(data, dispatch, navigate)

            if (!res) {
                setErrMsg('No server response')
            } else if (res.response?.status === 409) {
                setErrMsg('Username or email has been taken.')
            } else if (res.response?.status === 503) {
                setErrMsg('Somethings went wrong. Please try again later.')
            } else {
                setErrMsg('Registration failed.')
            }
            errRef.current.focus()
        } catch (error) {
            setErrMsg('Services Unavailable')
        }
    }

    return (
        <div className="register-container">
            <div className="register-header">
                <span>Register</span>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="double-field">
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
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            autoComplete="off"
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            required
                        />
                    </div>
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
                <div className="text-field">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        required
                    />
                </div>
                <div className="text-field">
                    <label htmlFor="phone">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        id="phone"
                        autoComplete="off"
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone}
                        required
                    />
                </div>
                <button>Signup</button>
            </form>
            <div className="register-footer">
                <div className="redirect-link">
                    <span>Already have an account?</span>
                    <Link to="/login">
                        <span>Login</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Register
