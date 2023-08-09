import './single.scss'
import { useLocation } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Chart from '../../components/chart/Chart'
import List from '../../components/table/Table'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createAxios } from '../../api/axiosInstance'
import { loginSuccess } from '../../redux/slices/authSlice'
import { getDetailUser } from '../../api/userApi'

const Single = () => {
    const auth = useSelector((state) => state.auth.login.currentUser)
    const location = useLocation()
    const dispatch = useDispatch()

    const axiosJWT = createAxios(auth, dispatch, loginSuccess)

    const [data, setData] = useState()

    useEffect(() => {
        const fetchDetailUser = async () => {
            const data = JSON.stringify({
                userID: location.pathname.split('/users/')[1]
            })

            await getDetailUser(data, auth?.accessToken, axiosJWT).then((data) => {
                setData(data)
                console.log(data)
            })
        }

        fetchDetailUser()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className="single">
            <Sidebar />
            <div className="singleContainer">
                <Navbar />
                <div className="top">
                    <div className="left">
                        <div className="editButton">Edit</div>
                        <h1 className="title">Information</h1>
                        <div className="item">
                            <img src={data?.avatar} alt="" className="itemImg" />
                            <div className="details">
                                <h1 className="itemTitle">{data?.name}</h1>
                                <div className="detailItem">
                                    <span className="itemKey">ID:</span>
                                    <span className="itemValue">{data?._id}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Username:</span>
                                    <span className="itemValue">{data?.username}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Email:</span>
                                    <span className="itemValue">{data?.email}</span>
                                </div>
                                <div className="detailItem">
                                    <span className="itemKey">Phone:</span>
                                    <span className="itemValue">{data?.phone}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <Chart aspect={3 / 1} title="User Spending ( Last 6 Months)" />
                    </div>
                </div>
                <div className="bottom">
                    <h1 className="title">Last Transactions</h1>
                    <List />
                </div>
            </div>
        </div>
    )
}

export default Single
