import '../../styles/Purchase.scss'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createAxios } from '../../api/axiosInstance'
import { loginSuccess } from '../../redux/slices/authSlice'
import { AiOutlineSearch } from 'react-icons/ai'
import { findOrder } from '../../api/orderApi'
import PurchaseCard from '../Card/PurchaseCard'

const Purchase = () => {
    const auth = useSelector((state) => state.auth.login.currentUser)
    const dispatch = useDispatch()
    const axiosJWT = createAxios(auth, dispatch, loginSuccess)

    const [purchaseData, setPurchaseData] = useState([])

    useEffect(() => {
        const fetchPurchase = async () => {
            try {
                const data = JSON.stringify({
                    userID: auth?.data?._id
                })

                await findOrder(data, auth?.accessToken, axiosJWT).then((data) => {
                    setPurchaseData(data?.data?.order)
                })
            } catch (error) {
                console.log(error)
            }
        }

        fetchPurchase()
    }, [])

    return (
        <div className="purchase-container">
            <div className="purchase-header">
                <div className="left-section">
                    <span>Purchase</span>
                    <span>You order will be appear here.</span>
                </div>
                <div className="purchase-input">
                    <input type="text" placeholder="Search..." />
                    <div className="icon">
                        <AiOutlineSearch size={20} />
                    </div>
                </div>
            </div>
            <div className="purchase-body">
                {purchaseData &&
                    purchaseData.map((item) => (
                        <PurchaseCard
                            key={item._id}
                            id={item._id}
                            productID={item.productID}
                            name={item.name}
                            quantity={item.quantity}
                            price={item.price}
                            pay_method={item.pay_method}
                            state={item.state}
                        />
                    ))}
            </div>
        </div>
    )
}

export default Purchase
