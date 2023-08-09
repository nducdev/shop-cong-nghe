import './datatable.scss'
import { useEffect, useState } from 'react'
import { MdKeyboardDoubleArrowRight, MdKeyboardDoubleArrowLeft } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { createAxios } from '../../api/axiosInstance'
import { loginSuccess } from '../../redux/slices/authSlice'
import { cancelOrder, getAllOrder, updateOrder } from '../../api/orderApi'

const Datatable = () => {
    const auth = useSelector((state) => state.auth.login.currentUser)
    const dispatch = useDispatch()

    const axiosJWT = createAxios(auth, dispatch, loginSuccess)

    const [skip, setSkip] = useState(0)
    const [data, setData] = useState()
    const [users, setUsers] = useState([])
    const [totalCount, setTotalCount] = useState()
    const [state, setState] = useState()
    const [updateOrderID, setUpdateOrderID] = useState()

    useEffect(() => {
        const fetchAllProduct = async () => {
            await getAllOrder(auth?.accessToken, axiosJWT, skip)
                .then((data) => {
                    setData(data?.data?.orderData)
                    setUsers(data?.data?.userData)
                    setTotalCount(data?.data?.count)

                    console.log(data)
                })
                .catch((error) => {
                    console.log(error)
                })
        }

        fetchAllProduct()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [skip])

    const handleUpdateOrder = async () => {
        try {
            const data = JSON.stringify({
                orderID: updateOrderID,
                state: state
            })

            const res = await updateOrder(data, auth?.accessToken, axiosJWT)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    }

    const handleCancelOrder = async (orderID) => {
        const data = JSON.stringify({
            orderID: orderID
        })

        await cancelOrder(data, auth?.accessToken, axiosJWT)
        window.location.reload()
    }

    const handleNext = () => {
        if (skip + 10 >= totalCount) {
            return
        }

        setSkip((prevSkip) => prevSkip + 10)
    }

    const handlePrevious = () => {
        if (skip === 0) {
            return
        }

        setSkip((prevSkip) => prevSkip - 10)
    }

    return (
        <div className="datatable">
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Name</th>
                        <th>Pay Method</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>State</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data &&
                        data?.map((item) => {
                            const user = users?.find((u) => u._id === item.userID)
                            console.log(user)
                            return (
                                <tr key={item._id}>
                                    <td style={{ padding: '16px 15px' }}>{item._id}</td>
                                    <td style={{ padding: '16px 15px' }}>
                                        <img src={user?.avatar} alt="" />
                                        <span>{user?.username}</span>
                                    </td>
                                    <td style={{ padding: '16px 15px' }}>{item.name}</td>
                                    <td style={{ padding: '16px 15px' }}>{item.pay_method}</td>
                                    <td style={{ padding: '16px 15px' }}>{item.quantity}</td>
                                    <td style={{ padding: '16px 15px' }}>{item.price}</td>
                                    <td style={{ padding: '16px 15px' }}>
                                        <select
                                            name=""
                                            id=""
                                            defaultValue={item.state}
                                            onChange={(e) => {
                                                setState(e.target.value)
                                                setUpdateOrderID(item._id)
                                            }}
                                        >
                                            <option value="pending">pending</option>
                                            <option value="in progress">in progress</option>
                                            <option value="delivered">delivered</option>
                                        </select>
                                    </td>
                                    <td style={{ padding: '16px 15px' }}>
                                        <button className="view-btn" onClick={handleUpdateOrder}>
                                            Update
                                        </button>
                                        <button
                                            className="delete-btn"
                                            onClick={() => handleCancelOrder(item._id)}
                                        >
                                            Cancel
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>
            <div className="pagination-btn">
                <button className="icon" onClick={handlePrevious}>
                    <MdKeyboardDoubleArrowLeft size={25} />
                </button>
                <button className="icon" onClick={handleNext}>
                    <MdKeyboardDoubleArrowRight size={25} />
                </button>
            </div>
        </div>
    )
}

export default Datatable
