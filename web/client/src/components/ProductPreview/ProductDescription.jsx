import '../../styles/ProductDescription.scss'
import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { createAxios } from '../../api/axiosInstance'
import { QuantityContext } from '../../context/QuantityContext'
import { AiFillStar, AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai'
import { MdOutlineLocalShipping, MdOutlineCardMembership } from 'react-icons/md'
import { addCart } from '../../api/cartApi'
import { loginSuccess } from '../../redux/slices/authSlice'

const ProductDescription = (props) => {
    const auth = useSelector((state) => state.auth.login.currentUser)
    const dispatch = useDispatch()
    const axiosJWT = createAxios(auth, dispatch, loginSuccess)

    const location = useLocation()

    const { quantity, setQuantity } = useContext(QuantityContext)

    const handleDecrease = () => {
        setQuantity(quantity - 1)
    }

    const handleIncrease = () => {
        setQuantity(quantity + 1)
    }

    const handleAddToCart = async () => {
        try {
            const data = JSON.stringify({
                userID: auth?.data?._id,
                productID: location.pathname.split('/product-detail/')[1]
            })

            const res = await addCart(auth?.accessToken, axiosJWT, data)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="product-description-container">
            <div className="product-name">
                <span>{props.name}</span>
            </div>
            <div className="product-brand">
                <span>Brand: {props.brand}</span>
            </div>
            <div className="product-desc">
                <span>{props.desc}</span>
            </div>
            <div className="product-stat">
                <div className="icon">
                    <AiFillStar size={15} color="yellow" />
                    <AiFillStar size={15} color="yellow" />
                    <AiFillStar size={15} color="yellow" />
                    <AiFillStar size={15} color="yellow" />
                    <AiFillStar size={15} color="yellow" />
                </div>
                <span>(121)</span>
            </div>
            <div className="product-price">
                <span>{props.price} VND</span>
                <span>Suggested payments with 6 months special financing</span>
            </div>
            <div className="product-quantity">
                <div className="quantity-btn">
                    <button onClick={handleDecrease} disabled={quantity === 1 ? true : false}>
                        <AiOutlineMinus size={22} />
                    </button>
                    <span>{quantity}</span>
                    <button onClick={handleIncrease} disabled={quantity === props.item ? true : false}>
                        <AiOutlinePlus size={22} />
                    </button>
                </div>
                <div className="text-wrapper">
                    <span>
                        Only
                        <span className="text">{props.item} items</span>
                        left!
                    </span>
                    <span>Don't miss it</span>
                </div>
            </div>
            <div className="pay-section">
                <Link to={auth?.data ? `/checkout/${props.id}` : '/login'}>
                    <div className="buy-btn">
                        <span>Buy Now</span>
                    </div>
                </Link>
                <div className="add-btn" onClick={handleAddToCart}>
                    <span>Add to Cart</span>
                </div>
            </div>
            <div className="ship-section">
                <div className="delivery">
                    <div className="icon">
                        <MdOutlineLocalShipping color="F0A972" size={22} />
                    </div>
                    <div className="text-wrapper">
                        <span>Free Delivery</span>
                        <span>Enter your Postal code for Delivery Availability.</span>
                    </div>
                </div>
                <div className="delivery">
                    <div className="icon">
                        <MdOutlineCardMembership color="F0A972" size={22} />
                    </div>
                    <div className="text-wrapper">
                        <span>Return Delivery</span>
                        <span>
                            Free 30 days Delivery Returns. <span>Details</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDescription
