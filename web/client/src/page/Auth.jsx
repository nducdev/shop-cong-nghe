import '../styles/Auth.scss'
import { useLocation } from 'react-router-dom'
import Login from '../components/Auth/Login'
import Register from '../components/Auth/Register'
import AuthImage from '../assets/auth-background.jpeg'

const Auth = () => {
    const location = useLocation()

    const isLoginRoute = location.pathname === '/login'
    const isRegisterRoute = location.pathname === '/register'

    return (
        <div className="auth-container">
            <div className="auth-modal">
                <div className="left-content">
                    <img src={AuthImage} alt="background" draggable="false" />
                    <span>
                        {isLoginRoute && 'Welcome Back!'}
                        {isRegisterRoute && "Let's explore from there"}
                    </span>
                </div>
                <div className="right-content">
                    {isLoginRoute && <Login />}
                    {isRegisterRoute && <Register />}
                </div>
            </div>
        </div>
    )
}

export default Auth
