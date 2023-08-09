import '../../styles/Header.scss'
import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { IoIosArrowDown } from 'react-icons/io'
import { HiSearch } from 'react-icons/hi'
import { FiUser, FiShoppingCart } from 'react-icons/fi'
import CartLogo from '../../assets/cart-logo.png'
import { logoutUser } from '../../api/authApi'
import { createAxios } from '../../api/axiosInstance'
import { loginSuccess } from '../../redux/slices/authSlice'
import { countCart } from '../../api/cartApi'

const Header = () => {
    const auth = useSelector((state) => state.auth.login.currentUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const axiosJWT = createAxios(auth, dispatch, loginSuccess)

    const [openProfile, setOpenProfile] = useState(false)
    const [count, setCount] = useState()

    const profileRef = useRef(null)

    useEffect(() => {
        const handleShowModal = (e) => {
            if (!profileRef.current.contains(e.target)) {
                setOpenProfile(false)
            }
        }

        document.addEventListener('mousedown', handleShowModal)

        return () => {
            document.removeEventListener('mousedown', handleShowModal)
        }
    })

    useEffect(() => {
        const fetchCount = async () => {
            try {
                const data = JSON.stringify({
                    userID: auth?.data?._id
                })

                const res = await countCart(auth?.accessToken, axiosJWT, data)
                setCount(res?.data?.count)
                console.log(res)
            } catch (error) {
                console.log(error)
            }
        }

        fetchCount()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleLogout = () => {
        logoutUser(dispatch, navigate, auth?.accessToken, axiosJWT)
    }

    return (
        <div className="header-container">
            <Link to="/">
                <div className="logo-section">
                    <img src={CartLogo} alt="" draggable="false" />
                    <span>ShopCongNghe</span>
                </div>
            </Link>
            <div className="list-section">
                <div className="item">
                    <span>Categories</span>
                    <IoIosArrowDown />
                </div>
                <div className="item">Deals</div>
                <div className="item">Delivery</div>
            </div>
            <div className="user-section">
                <div className="search-section">
                    <input type="text" placeholder="Search Product" />
                    <div className="icon">
                        <HiSearch size={20} />
                    </div>
                </div>
                <div className="account-section" ref={profileRef}>
                    {auth?.data ? (
                        <>
                            <div className="user-profile" onClick={() => setOpenProfile(!openProfile)}>
                                <div className="user-ava">
                                    <img src={auth?.data?.avatar} alt="avatar" draggable="false" />
                                </div>
                                <div className="user-name">
                                    <span>{auth?.data?.username}</span>
                                </div>
                            </div>
                            <Link to="/user/cart">
                                <div className="cart-section">
                                    <div className="icon">
                                        <FiShoppingCart size={26} />
                                        {count > 0 && (
                                            <div className="number-count">
                                                <span>{count}</span>
                                            </div>
                                        )}
                                    </div>
                                    <span>Cart</span>
                                </div>
                            </Link>
                        </>
                    ) : (
                        <Link to="/login">
                            <div className="local-account">
                                <div className="icon">
                                    <FiUser size={26} />
                                </div>
                                <span>Account</span>
                            </div>
                        </Link>
                    )}
                    {openProfile && (
                        <div className="profile-menu">
                            <Link to="/user">
                                <div className="profile-option">
                                    <span>My profile</span>
                                </div>
                            </Link>
                            <Link to="/user/purchase">
                                <div className="profile-option">
                                    <span>My cart</span>
                                </div>
                            </Link>
                            <div className="profile-option" onClick={handleLogout}>
                                <span>Logout</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Header
