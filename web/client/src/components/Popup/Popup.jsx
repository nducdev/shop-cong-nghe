import '../../styles/Popup.scss'
import { Link } from 'react-router-dom'
import { BsCheckLg } from 'react-icons/bs'

const Popup = () => {
    return (
        <div className="popup-container">
            <div className="popup-modal">
                <div className="popup-header">
                    <div className="icon-container">
                        <div className="icon">
                            <BsCheckLg size={60} color="fff" />
                        </div>
                    </div>
                </div>
                <div className="popup-body">
                    <span>
                        You order has been<span>accepted.</span>
                    </span>
                    <span className="order-id">Order ID: 103864296350260260846</span>
                </div>
                <div className="popup-footer">
                    <Link to="/">
                        <div className="redirect-btn">
                            <span>Return to Homepage</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Popup
