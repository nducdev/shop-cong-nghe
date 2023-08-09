import '../styles/Checkout.scss'
import '../styles/ProductSummery.scss'
import '../styles/ProductOverview.scss'
import { useContext, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { createAxios } from '../api/axiosInstance'
import { QuantityContext } from '../context/QuantityContext'
import { loginSuccess } from '../redux/slices/authSlice'
import { getProductDetail } from '../api/productApi'
import { deliveryApi, findDelivery } from '../api/orderApi'
import { orderApi } from '../api/orderApi'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import AmazonPayment from '../assets/payments/amazon.png'
import MasterCard from '../assets/payments/mastercard.png'
import Visa from '../assets/payments/visa.png'
import Popup from '../components/Popup/Popup'

const Checkout = () => {
    const auth = useSelector((state) => state.auth.login.currentUser)
    const dispatch = useDispatch()

    const { quantity } = useContext(QuantityContext)

    const [productData, setProductData] = useState()
    const [deliveryData, setDeliveryData] = useState()

    // delivery
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [selectedOption, setSelectedOption] = useState(1)

    // order
    const [payMethod, setPayMethod] = useState('')

    const [activePayTab, setActivePayTab] = useState(1)
    const [activePayContent, setActivePayContent] = useState(1)

    const [isChecked, setIsChecked] = useState(false)
    const [orderID, setOrderID] = useState()
    const [isSuccess, setIsSuccess] = useState(false)

    const axiosJWT = createAxios(auth, dispatch, loginSuccess)

    const location = useLocation()

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const data = JSON.stringify({
                    productID: location.pathname.split('/checkout/')[1]
                })

                const res = await getProductDetail(data)
                setProductData(res?.data?.product)
            } catch (error) {
                console.log(error)
            }
        }

        fetchProduct()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const fetchFindDelivery = async () => {
            try {
                const data = JSON.stringify({
                    userID: auth?.data?._id
                })

                const res = await findDelivery(auth?.accessToken, axiosJWT, data)
                console.log(res)

                if (res?.data === false) {
                    setDeliveryData(res?.data)
                } else {
                    setDeliveryData(res?.data?.delivery[0])
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchFindDelivery()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleOption = (index) => {
        setSelectedOption(index)
    }

    const handleActivePay = (index) => {
        setActivePayTab(index)
        setActivePayContent(index)
    }

    const handleSubmitDelivery = async (e) => {
        // e.preventDefault()

        try {
            const data = JSON.stringify({
                userID: auth?.data?._id,
                firstname: firstname,
                lastname: lastname,
                address: address,
                city: city,
                zipcode: zipcode,
                email: email,
                phone: phone
            })

            const res = await deliveryApi(data, auth?.accessToken, axiosJWT)

            return res
        } catch (error) {
            console.log(error)
        }
    }

    const handleSubmitOrder = async (e) => {
        e.preventDefault()
        let userID
        let deliveryID

        if (isChecked === true) {
            userID = auth?.data?._id
            deliveryID = deliveryData?._id
        } else {
            const deliveryExec = await handleSubmitDelivery()
            userID = auth?.data?._id
            deliveryID = deliveryExec?.data?.delivery?._id
        }

        try {
            const data = JSON.stringify({
                userID: userID,
                deliveryID: deliveryID,
                productID: location.pathname.split('/checkout/')[1],
                name: productData?.name,
                price: parseFloat(productData?.price),
                quantity: quantity,
                pay_method: payMethod,
                image: productData?.image[0]
            })

            console.log(data)

            const res = await orderApi(data, auth?.accessToken, axiosJWT)
            setOrderID(res?.data?.order?._id)

            if (res.status === 'success') {
                setIsSuccess(true)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="checkout-container">
            <Header />
            <div className="body-page">
                <div className="left-section">
                    <div className="product-review">
                        <div className="item-review">
                            <span>Review Item And Shipping</span>
                            <div className="product-detail">
                                <div className="left-content">
                                    <img src={productData?.image[0]} alt="" />
                                    <div className="product-info">
                                        <span>{productData?.name}</span>
                                    </div>
                                </div>
                                <div className="right-content">
                                    <span>${productData?.price}</span>
                                    <span>Quantity: {quantity}</span>
                                </div>
                            </div>
                        </div>
                        <div className="check-customer">
                            <input
                                type="checkbox"
                                id="check"
                                checked={isChecked}
                                onChange={(e) => setIsChecked(e.target.checked)}
                                disabled={deliveryData === false ? true : false}
                            />
                            <label htmlFor="check">Returning Customer?</label>
                        </div>
                        <div className="delivery-info">
                            <form onSubmit={handleSubmitDelivery}>
                                <div className="delivery-header">
                                    <span>Delivery Information</span>
                                    <button className="info-save-btn">Save Information</button>
                                </div>
                                <div className="delivery-body">
                                    <div className="double-field">
                                        <div className="text-field">
                                            <label htmlFor="firstname">First Name*</label>
                                            <input
                                                required
                                                type="text"
                                                id="firstname"
                                                placeholder={
                                                    isChecked === false
                                                        ? 'Type here...'
                                                        : deliveryData?.firstname
                                                }
                                                disabled={isChecked === false ? false : true}
                                                onChange={(e) => setFirstname(e.target.value)}
                                                value={firstname}
                                            />
                                        </div>
                                        <div className="text-field">
                                            <label htmlFor="lastname">Last Name*</label>
                                            <input
                                                required
                                                type="text"
                                                id="lastname"
                                                placeholder={
                                                    isChecked === false
                                                        ? 'Type here...'
                                                        : deliveryData?.lastname
                                                }
                                                disabled={isChecked === false ? false : true}
                                                onChange={(e) => setLastname(e.target.value)}
                                                value={lastname}
                                            />
                                        </div>
                                    </div>
                                    <div className="single-field">
                                        <div className="text-field">
                                            <label htmlFor="address">Address*</label>
                                            <input
                                                required
                                                type="text"
                                                id="address"
                                                placeholder={
                                                    isChecked === false
                                                        ? 'Type here...'
                                                        : deliveryData?.address
                                                }
                                                disabled={isChecked === false ? false : true}
                                                onChange={(e) => setAddress(e.target.value)}
                                                value={address}
                                            />
                                        </div>
                                    </div>
                                    <div className="double-field">
                                        <div className="text-field">
                                            <label htmlFor="city">City/Town*</label>
                                            <input
                                                required
                                                type="text"
                                                placeholder={
                                                    isChecked === false ? 'Type here...' : deliveryData?.city
                                                }
                                                disabled={isChecked === false ? false : true}
                                                onChange={(e) => setCity(e.target.value)}
                                                value={city}
                                            />
                                        </div>
                                        <div className="text-field">
                                            <label htmlFor="zipcode">Zip Code*</label>
                                            <input
                                                required
                                                type="text"
                                                id="zipcode"
                                                placeholder={
                                                    isChecked === false
                                                        ? 'Type here...'
                                                        : deliveryData?.zipcode
                                                }
                                                disabled={isChecked === false ? false : true}
                                                onChange={(e) => setZipcode(e.target.value)}
                                                value={zipcode}
                                            />
                                        </div>
                                    </div>
                                    <div className="double-field">
                                        <div className="text-field">
                                            <label htmlFor="phone">Phone*</label>
                                            <input
                                                required
                                                type="tel"
                                                id="phone"
                                                placeholder={
                                                    isChecked === false ? 'Type here...' : deliveryData?.phone
                                                }
                                                disabled={isChecked === false ? false : true}
                                                onChange={(e) => setPhone(e.target.value)}
                                                value={phone}
                                            />
                                        </div>
                                        <div className="text-field">
                                            <label htmlFor="email">Email*</label>
                                            <input
                                                required
                                                type="email"
                                                id="email"
                                                placeholder={
                                                    isChecked === false ? 'Type here...' : deliveryData?.email
                                                }
                                                disabled={isChecked === false ? false : true}
                                                onChange={(e) => setEmail(e.target.value)}
                                                value={email}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="middle-section"></div>
                <div className="right-section">
                    <div className="product-summery-container">
                        <div className="summery-header">
                            <span>Order Summery</span>
                        </div>
                        <div className="summery-content">
                            <form onSubmit={handleSubmitOrder}>
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
                                                onChange={() => {
                                                    handleOption(1)
                                                    setPayMethod('cash on delivery')
                                                }}
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
                                                onChange={() => {
                                                    handleOption(2)
                                                    setPayMethod('shopcart card')
                                                }}
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
                                                onChange={() => {
                                                    handleOption(3)
                                                    setPayMethod('paypal')
                                                }}
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
                                                onChange={() => {
                                                    handleOption(4)
                                                    setPayMethod('credit')
                                                }}
                                            />
                                            <label htmlFor="option4">Credit or Debit card</label>
                                        </div>
                                    </div>
                                </div>
                                {selectedOption === 4 && (
                                    <div className="pay-via-card">
                                        <div className="pay-header">
                                            <div
                                                className={
                                                    activePayTab === 1
                                                        ? 'block-payment active'
                                                        : 'block-payment'
                                                }
                                                onClick={() => handleActivePay(1)}
                                            >
                                                <img src={AmazonPayment} alt="" />
                                            </div>
                                            <div
                                                className={
                                                    activePayTab === 2
                                                        ? 'block-payment active'
                                                        : 'block-payment'
                                                }
                                                onClick={() => handleActivePay(2)}
                                            >
                                                <img src={MasterCard} alt="" />
                                            </div>
                                            <div
                                                className={
                                                    activePayTab === 3
                                                        ? 'block-payment active'
                                                        : 'block-payment'
                                                }
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
                                                        <input
                                                            type="email"
                                                            id="pay-email"
                                                            placeholder="Type here..."
                                                        />
                                                    </div>
                                                    <div className="text-field">
                                                        <label htmlFor="pay-card-holder-name">
                                                            Card Holder Name*
                                                        </label>
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
                                                            <input
                                                                type="text"
                                                                id="Expiry"
                                                                placeholder="MM/YY"
                                                            />
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
                                            <span>Quantity (10%)</span>
                                            <span>{quantity}</span>
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
                                        <span>
                                            =$
                                            {quantity === 1
                                                ? productData?.price
                                                : productData?.price * quantity}
                                        </span>
                                    </div>
                                </div>
                                <button className="payment-btn">Pay ${productData?.price}</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
            {isSuccess && <Popup orderID={orderID} />}
        </div>
    )
}

export default Checkout
