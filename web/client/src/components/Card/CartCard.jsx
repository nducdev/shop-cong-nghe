import '../../styles/CartCard.scss'
import { useContext } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai'
import { QuantityContext } from '../../context/QuantityContext'
import { deleteCart } from '../../api/cartApi'
import { createAxios } from '../../api/axiosInstance'
import { loginSuccess } from '../../redux/slices/authSlice'

const CartCard = (props) => {
    const auth = useSelector((state) => state.auth.login.currentUser)
    const { quantity, setQuantity } = useContext(QuantityContext)
    const dispatch = useDispatch()
    const axiosJWT = createAxios(auth, dispatch, loginSuccess)

    const handleDecrease = () => {
        setQuantity(quantity - 1)
    }

    const handleIncrease = () => {
        setQuantity(quantity + 1)
    }

    const handleDelete = async () => {
        try {
            const data = JSON.stringify({
                cartID: props.cartID
            })

            const res = await deleteCart(auth?.accessToken, axiosJWT, data)
            console.log(res)

            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="cart-card-container">
            <div className="first-section">
                <img src={props.image} alt="product" draggable="false" />
                <span>{props.name}</span>
            </div>
            <div className="second-section">
                <div className="quantity-btn">
                    <button onClick={handleDecrease} disabled={quantity === 1 ? true : false}>
                        <AiOutlineMinus size={18} />
                    </button>
                    <span>{quantity}</span>
                    <button onClick={handleIncrease} disabled={quantity === props.item ? true : false}>
                        <AiOutlinePlus size={18} />
                    </button>
                </div>
            </div>
            <div className="third-section">
                <span>
                    <span className="item-section">{props.item}</span> item left
                </span>
            </div>
            <div className="fourth-section">{quantity === 1 ? props.price : props.price * quantity} VND</div>
            <div className="fifth-section">
                <Link to={`/checkout/${props.id}`}>
                    <button className="buy-btn">Buy</button>
                </Link>
                <button onClick={handleDelete}>Delete</button>
            </div>
        </div>
    )
}

export default CartCard
