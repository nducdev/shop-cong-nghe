import '../../styles/ProductOverview.scss'
import { useContext, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createAxios } from '../../api/axiosInstance'
import { loginSuccess } from '../../redux/slices/authSlice'
import { QuantityContext } from '../../context/QuantityContext'
import { deliveryApi } from '../../api/orderApi'

const ProductOverview = () => {
    const auth = useSelector((state) => state.auth.login.currentUser)
    const dispatch = useDispatch()

    const { quantity } = useContext(QuantityContext)

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [zipcode, setZipcode] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')

    const axiosJWT = createAxios(auth, dispatch, loginSuccess)

    const handleSubmitDelivery = async (e) => {
        e.preventDefault()

        try {
            const data = JSON.stringify({
                firstname: firstname,
                lastname: lastname,
                address: address,
                city: city,
                zipcode: zipcode,
                email: email,
                phone: phone
            })

            const res = await deliveryApi(data, auth?.accessToken, axiosJWT)

            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="product-review">
            <div className="item-review">
                <span>Review Item And Shipping</span>
                <div className="product-detail">
                    <div className="left-content">
                        <img
                            src="https://down-vn.img.susercontent.com/file/93b3f6d4799b06f9279f817540daa4d1"
                            alt=""
                        />
                        <div className="product-info">
                            <span>Iphone 14 Pro Max</span>
                        </div>
                    </div>
                    <div className="right-content">
                        <span>$999.00</span>
                        <span>Quantity: {quantity}</span>
                    </div>
                </div>
            </div>
            <div className="check-customer">
                <input type="checkbox" id="check" />
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
                                    placeholder="Type here..."
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
                                    placeholder="Type here..."
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
                                    placeholder="Type here..."
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
                                    id="city"
                                    placeholder="Type here..."
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
                                    placeholder="Type here..."
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
                                    placeholder="Type here..."
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
                                    placeholder="Type here..."
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ProductOverview
