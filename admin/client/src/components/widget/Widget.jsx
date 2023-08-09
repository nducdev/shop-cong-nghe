import './widget.scss'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined'
import { getAllUser } from '../../api/userApi'
import { useDispatch, useSelector } from 'react-redux'
import { createAxios } from '../../api/axiosInstance'
import { loginSuccess } from '../../redux/slices/authSlice'
import { getAllOrder } from '../../api/orderApi'
import { getAllProduct } from '../../api/productApi'

const Widget = ({ type }) => {
    const auth = useSelector((state) => state.auth.login.currentUser)
    const dispatch = useDispatch()
    const axiosJWT = createAxios(auth, dispatch, loginSuccess)

    const [userCount, setUserCount] = useState()
    const [orderCount, setOrderCount] = useState()
    const [productCount, setProductCount] = useState()

    useEffect(() => {
        const fetchAllUser = async () => {
            try {
                const res = await getAllUser(auth?.accessToken, axiosJWT)
                setUserCount(res?.data?.count)
            } catch (error) {
                console.log(error)
            }
        }

        fetchAllUser()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const fetchAllOrder = async () => {
            try {
                const res = await getAllOrder(auth?.accessToken, axiosJWT)
                setOrderCount(res?.data?.count)
            } catch (error) {
                console.log(error)
            }
        }

        fetchAllOrder()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const fetchAllProduct = async () => {
            try {
                const res = await getAllProduct()
                setProductCount(res?.data?.count)
            } catch (error) {
                console.log(error)
            }
        }

        fetchAllProduct()
    }, [])

    let data

    switch (type) {
        case 'user':
            data = {
                title: 'USERS',
                link: 'See all users',
                url: '/users',
                amount: userCount,
                icon: (
                    <PersonOutlinedIcon
                        className="icon"
                        style={{
                            color: 'crimson',
                            backgroundColor: 'rgba(255, 0, 0, 0.2)'
                        }}
                    />
                )
            }
            break
        case 'order':
            data = {
                title: 'ORDERS',
                link: 'View all orders',
                url: '/orders',
                amount: orderCount,
                icon: (
                    <ShoppingCartOutlinedIcon
                        className="icon"
                        style={{
                            backgroundColor: 'rgba(218, 165, 32, 0.2)',
                            color: 'goldenrod'
                        }}
                    />
                )
            }
            break
        case 'product':
            data = {
                title: 'PRODUCTS',
                link: 'View all products',
                url: '/products',
                amount: productCount,
                icon: (
                    <MonetizationOnOutlinedIcon
                        className="icon"
                        style={{ backgroundColor: 'rgba(0, 128, 0, 0.2)', color: 'green' }}
                    />
                )
            }
            break
        case 'delivery':
            data = {
                title: 'DELIVERY',
                link: 'See all delivery',
                url: '/deliveries',
                amount: 100,
                icon: (
                    <AccountBalanceWalletOutlinedIcon
                        className="icon"
                        style={{
                            backgroundColor: 'rgba(128, 0, 128, 0.2)',
                            color: 'purple'
                        }}
                    />
                )
            }
            break
        default:
            break
    }

    return (
        <div className="widget">
            <div className="left">
                <span className="title">{data.title}</span>
                <span className="counter">{data.amount}</span>
                <Link to={data.url}>
                    <span className="link">{data.link}</span>
                </Link>
            </div>
            <div className="right">
                {/* <div className="percentage positive">
                    <KeyboardArrowUpIcon />
                    {diff} %
                </div> */}
                {data.icon}
            </div>
        </div>
    )
}

export default Widget
