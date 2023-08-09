import '../../styles/Footer.scss'
import { BsBagDash, BsGift, BsQuestionCircle } from 'react-icons/bs'
import CartLogo from '../../assets/cart-logo.png'
import AmazonPayment from '../../assets/payments/amazon.png'
import ApplePayment from '../../assets/payments/applepay.png'
import GooglePayment from '../../assets/payments/googlepay.png'
import KlarnaPayment from '../../assets/payments/klarna.png'
import MasterCard from '../../assets/payments/mastercard.png'
import PayPal from '../../assets/payments/paypal.png'
import StripePayment from '../../assets/payments/stripe.png'
import Visa from '../../assets/payments/visa.png'

const Footer = () => {
    return (
        <div className="footer-container">
            <div className="top-section">
                <div className="right-section">
                    <div className="logo-section">
                        <img src={CartLogo} alt="" />
                        <span>ShopCongNghe</span>
                    </div>
                    <div className="text">
                        <span>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum ab explicabo
                            quibusdam reiciendis consequuntur odio recusandae sint quod, atque fugiat amet
                            asperiores totam
                        </span>
                    </div>
                    <div className="payment-section">
                        <span>Accepted Payments</span>
                        <div className="list-payment">
                            <div className="block-payment">
                                <img src={StripePayment} alt="stripe" />
                            </div>
                            <div className="block-payment">
                                <img src={Visa} alt="" />
                            </div>
                            <div className="block-payment">
                                <img src={MasterCard} alt="" />
                            </div>
                            <div className="block-payment">
                                <img src={AmazonPayment} alt="" />
                            </div>
                            <div className="block-payment">
                                <img src={KlarnaPayment} alt="" />
                            </div>
                            <div className="block-payment">
                                <img src={PayPal} alt="" />
                            </div>
                            <div className="block-payment">
                                <img src={ApplePayment} alt="" />
                            </div>
                            <div className="block-payment">
                                <img src={GooglePayment} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="left-section">
                    <div className="list">
                        <span>Department</span>
                        <div className="item">
                            <span>Fashion</span>
                            <span>Education Product</span>
                            <span>Frozen Food</span>
                            <span>Beverages</span>
                            <span>Organic Grocery</span>
                            <span>Office Supplies</span>
                            <span>Beauty Products</span>
                            <span>Books</span>
                            <span>Electronics & Gadget</span>
                            <span>Travel Accessories</span>
                            <span>Fitness</span>
                            <span>Sneakers</span>
                            <span>Toys</span>
                            <span>Furniture</span>
                        </div>
                    </div>
                    <div className="list">
                        <span>About Us</span>
                        <div className="item">
                            <span>About Shopcart</span>
                            <span>Careers</span>
                            <span>News & Blog</span>
                            <span>Help</span>
                            <span>Press Center</span>
                            <span>Shop By Location</span>
                            <span>Shopcart Brands</span>
                            <span>Affiliate & Partners</span>
                            <span>Ideas & Guides</span>
                        </div>
                    </div>
                    <div className="list">
                        <span>Services</span>
                        <div className="item">
                            <span>Gift Card</span>
                            <span>Mobile App</span>
                            <span>Shipping & Delivery</span>
                            <span>Order Pickup</span>
                            <span>Account Signup</span>
                        </div>
                    </div>
                    <div className="list">
                        <span>Help</span>
                        <div className="item">
                            <span>Shopcart Help</span>
                            <span>Returns</span>
                            <span>Track Orders</span>
                            <span>Contact Us</span>
                            <span>Feedback</span>
                            <span>Security & Fraud</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bottom-section">
                <div className="left-section">
                    <div className="item">
                        <div className="icon">
                            <BsBagDash color="C34D82" size={24} />
                        </div>
                        <span>Become Seller</span>
                    </div>
                    <div className="item">
                        <div className="icon">
                            <BsGift color="C34D82" size={24} />
                        </div>
                        <span>Gift Cards</span>
                    </div>
                    <div className="item">
                        <div className="icon">
                            <BsQuestionCircle color="C34D82" size={24} />
                        </div>
                        <span>Help Center</span>
                    </div>
                </div>
                <div className="middle-section">
                    <span>Term of Service</span>
                    <span>Privacy & Policy</span>
                </div>
                <div className="right-secti">
                    <span>All Right reserved by Seto | 2023</span>
                </div>
            </div>
        </div>
    )
}

export default Footer
