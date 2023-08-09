import '../../styles/ProductSummery.scss'

import { useContext, useState } from 'react'
import AmazonPayment from '../../assets/payments/amazon.png'
import MasterCard from '../../assets/payments/mastercard.png'
import Visa from '../../assets/payments/visa.png'
import { QuantityContext } from '../../context/QuantityContext'

const ProductSummery = () => {
    const { quantity } = useContext(QuantityContext)

    const [selectedOption, setSelectedOption] = useState(1)
    const [activePayTab, setActivePayTab] = useState(1)
    const [activePayContent, setActivePayContent] = useState(1)

    const handleOption = (index) => {
        setSelectedOption(index)
    }

    const handleActivePay = (index) => {
        setActivePayTab(index)
        setActivePayContent(index)
    }

    const handleSubmitOrder = async (e) => {
        e.preventDefault()
    }

    return (
        <div className="product-summery-container">
            <div className="summery-header">
                <span>Order Summery</span>
            </div>
            <div className="summery-content">
                <div className="coupon-code">
                    <input type="text" placeholder="Enter Coupon Code" />
                    <button>Apply coupon</button>
                </div>
                <div className="payment-detail">
                    <span>Payment Detail</span>
                    <div className="payment-option">
                        <div className="input-wrapper">
                            <input
                                type="radio"
                                name="option"
                                value="1"
                                id="option1"
                                required
                                onChange={() => handleOption(1)}
                                checked={selectedOption === 1}
                            />
                            <label htmlFor="option1">Cash on Delivery</label>
                        </div>
                        <div className="input-wrapper">
                            <input
                                type="radio"
                                name="option"
                                value="2"
                                id="option2"
                                required
                                onChange={() => handleOption(2)}
                                checked={selectedOption === 2}
                            />
                            <label htmlFor="option2">Shopcart Card</label>
                        </div>
                        <div className="input-wrapper">
                            <input
                                type="radio"
                                name="option"
                                value="3"
                                id="option3"
                                required
                                onChange={() => handleOption(3)}
                                checked={selectedOption === 3}
                            />
                            <label htmlFor="option3">Paypal</label>
                        </div>
                        <div className="input-wrapper">
                            <input
                                type="radio"
                                name="option"
                                value="4"
                                id="option4"
                                required
                                onChange={() => handleOption(4)}
                                checked={selectedOption === 4}
                            />
                            <label htmlFor="option4">Credit or Debit card</label>
                        </div>
                    </div>
                </div>
                {selectedOption === 4 && (
                    <div className="pay-via-card">
                        <div className="pay-header">
                            <div
                                className={activePayTab === 1 ? 'block-payment active' : 'block-payment'}
                                onClick={() => handleActivePay(1)}
                            >
                                <img src={AmazonPayment} alt="" />
                            </div>
                            <div
                                className={activePayTab === 2 ? 'block-payment active' : 'block-payment'}
                                onClick={() => handleActivePay(2)}
                            >
                                <img src={MasterCard} alt="" />
                            </div>
                            <div
                                className={activePayTab === 3 ? 'block-payment active' : 'block-payment'}
                                onClick={() => handleActivePay(3)}
                            >
                                <img src={Visa} alt="" />
                            </div>
                        </div>
                        <div className="pay-content">
                            {activePayContent === 1 && (
                                <div className="pay-field">
                                    <div className="text-field">
                                        <label htmlFor="pay-email">Email*</label>
                                        <input type="email" id="pay-email" placeholder="Type here..." />
                                    </div>
                                    <div className="text-field">
                                        <label htmlFor="pay-card-holder-name">Card Holder Name*</label>
                                        <input
                                            type="text"
                                            id="pay-card-holder-name"
                                            placeholder="Type here..."
                                        />
                                    </div>
                                    <div className="text-field">
                                        <label htmlFor="pay-card-number">Card Number*</label>
                                        <input
                                            type="text"
                                            id="pay-card-number"
                                            placeholder="Ex: 0000*****1245"
                                        />
                                    </div>
                                    <div className="double-field">
                                        <div className="text-field">
                                            <label htmlFor="Expiry">Expiry*</label>
                                            <input type="text" id="Expiry" placeholder="MM/YY" />
                                        </div>
                                        <div className="text-field">
                                            <label htmlFor="cvc">CVC*</label>
                                            <input type="text" id="cvc" placeholder="000" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                <div className="total-cost">
                    <div className="list-cost">
                        <div className="cost-item">
                            <span>Sub total</span>
                            <span>$999.00</span>
                        </div>
                        <div className="cost-item">
                            <span>Tax (10%)</span>
                            <span>$99.00</span>
                        </div>
                        <div className="cost-item">
                            <span>Coupon Discount</span>
                            <span>-$99.00</span>
                        </div>
                        <div className="cost-item">
                            <span>Shipping Cost</span>
                            <span>-$0.00</span>
                        </div>
                    </div>
                    <div className="total">
                        <span>Total</span>
                        <span>=$494.10</span>
                    </div>
                </div>
                <button className="payment-btn">Pay $494.10</button>
            </div>
        </div>
    )
}

export default ProductSummery
