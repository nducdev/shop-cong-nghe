import '../styles/User.scss'
import { useSelector } from 'react-redux'
import { useLocation, Link } from 'react-router-dom'
import { AiOutlineUser } from 'react-icons/ai'
import { BiPencil } from 'react-icons/bi'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Profile from '../components/User/Profile'
import Purchase from '../components/User/Purchase'
import ChangePwd from '../components/User/ChangePwd'
import Cart from '../page/Cart'

const User = () => {
    const auth = useSelector((state) => state.auth.login.currentUser)
    const location = useLocation()

    return (
        <div className="user-container">
            <Header />
            <div className="user-content">
                <div className="left-section">
                    <div className="user-profile">
                        <img src={auth?.data?.avatar} alt="" />
                        <div className="user-info">
                            <span>{auth?.data?.username}</span>
                            <Link to="/user">
                                <span>
                                    <div className="icon">
                                        <BiPencil />
                                    </div>
                                    Edit Profile
                                </span>
                            </Link>
                        </div>
                    </div>
                    <div className="user-option">
                        <span>
                            <div className="icon">
                                <AiOutlineUser size={22} />
                            </div>
                            My account
                        </span>
                        <div className="list-option">
                            <Link to="/user">
                                <span>Profile</span>
                            </Link>
                            <Link to="/user/purchase">
                                <span>Purchase</span>
                            </Link>
                            <Link to="/user/cart">
                                <span>Cart</span>
                            </Link>
                            <Link to="/user/change-password">
                                <span>Change Password</span>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="middle-section"></div>
                <div className="right-section">
                    {location.pathname === '/user' && (
                        <Profile
                            username={auth?.data?.username}
                            avatar={auth?.data?.avatar}
                            name={auth?.data?.name}
                            phone={auth?.data?.phone}
                            email={auth?.data?.email}
                        />
                    )}
                    {location.pathname === '/user/purchase' && <Purchase />}
                    {location.pathname === '/user/cart' && <Cart />}
                    {location.pathname === '/user/change-password' && <ChangePwd />}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default User
