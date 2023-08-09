import '../../styles/PurchaseCard.scss'
import { Link } from 'react-router-dom'

const PurchaseCard = (props) => {
    return (
        <div className="purchase-card-container">
            <div className="first-section">
                <img src={props.image} alt="product" draggable="false" />
                <span>{props.name}</span>
            </div>
            <div className="second-section">
                <span>Quantity: {props.quantity}</span>
            </div>
            <div className="third-section">
                <span>Pay method: {props.pay_method}</span>
            </div>
            <div className="fourth-section">
                <span>Total: {props.price} VND</span>
            </div>
            <div className="fifth-section">
                <span>State: {props.state}</span>
            </div>
            <div className="sixth-section">
                <Link to={`/product-detail/${props.productID}`}>
                    <button>View</button>
                </Link>
            </div>
        </div>
    )
}

export default PurchaseCard
