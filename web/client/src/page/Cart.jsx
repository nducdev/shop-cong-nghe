import '../styles/Cart.scss'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { findCart } from '../api/cartApi'
import { createAxios } from '../api/axiosInstance'
import { loginSuccess } from '../redux/slices/authSlice'
import { AiOutlineSearch } from 'react-icons/ai'
import CartCard from '../components/Card/CartCard'

const Cart = () => {
    const auth = useSelector((state) => state.auth.login.currentUser)
    const dispatch = useDispatch()
    const axiosJWT = createAxios(auth, dispatch, loginSuccess)

    const [cartData, setCartData] = useState([])
    const [cartID, setCartID] = useState([])

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const data = JSON.stringify({
                    userID: auth?.data?._id
                })

                await findCart(auth?.accessToken, axiosJWT, data).then((data) => {
                    setCartData(data?.data?.productData)
                    setCartID(data?.data?.cartID)
                })
            } catch (error) {
                console.log(error)
            }
        }

        fetchCart()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="cart-container">
            <div className="cart-header">
                <span>My Cart</span>
                <div className="cart-input">
                    <input type="text" placeholder="Search Cart..." />
                    <div className="icon">
                        <AiOutlineSearch />
                    </div>
                </div>
            </div>
            {cartData &&
                cartData.map((item) => {
                    const cart = cartID?.find((u) => u.productID === item._id)

                    return (
                        <CartCard
                            key={item._id}
                            id={item._id}
                            cartID={cart?._id}
                            name={item.name}
                            image={item.image[0]}
                            item={item.item}
                            price={item.price}
                        />
                    )
                })}
            {cartID?.length === 0 && (
                <div className="no-cart-container">
                    <span>You don't have any cart.</span>
                </div>
            )}
        </div>
    )
}

export default Cart
