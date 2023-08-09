import './featured.scss'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import KeyboardArrowUpOutlinedIcon from '@mui/icons-material/KeyboardArrowUpOutlined'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { renevueYear, renevueDay, renevueMonth } from '../../api/orderApi'
import { createAxios } from '../../api/axiosInstance'
import { loginSuccess } from '../../redux/slices/authSlice'

const Featured = () => {
    const auth = useSelector((state) => state.auth.login.currentUser)
    const dispatch = useDispatch()
    const axiosJWT = createAxios(auth, dispatch, loginSuccess)

    const [day, setDay] = useState([])
    const [month, setMonth] = useState([])
    const [year, setYear] = useState([])

    useEffect(() => {
        let isMounted = true // Add a boolean flag to track if the component is mounted

        const fetchRenevueYear = async () => {
            try {
                const res = await renevueYear(auth?.accessToken, axiosJWT)
                if (isMounted) {
                    // Check if the component is still mounted before updating the state
                    setYear(res?.data?.revenue)
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchRenevueYear()

        return () => {
            isMounted = false // Set the flag to false when the component is unmounted
        }
    }, [])

    // ...

    useEffect(() => {
        let isMounted = true

        const fetchRenevueDay = async () => {
            try {
                const res = await renevueDay(auth?.accessToken, axiosJWT)
                if (isMounted) {
                    setDay(res?.data?.revenue)
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchRenevueDay()

        return () => {
            isMounted = false
        }
    }, [])

    // ...

    useEffect(() => {
        let isMounted = true

        const fetchRenevueMonth = async () => {
            try {
                const res = await renevueMonth(auth?.accessToken, axiosJWT)
                if (isMounted) {
                    setMonth(res?.data?.revenue)
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchRenevueMonth()

        return () => {
            isMounted = false
        }
    }, [])

    // ...

    return (
        <div className="featured">
            <div className="top">
                <h1 className="title">Total Revenue</h1>
                <MoreVertIcon fontSize="small" />
            </div>
            <div className="bottom">
                <div className="featuredChart">
                    <CircularProgressbar value={70} text={'70%'} strokeWidth={5} />
                </div>
                <p className="title">Total sales made today</p>
                <p className="amount">{day?.length > 0 ? day[0].totalRevenue : 0} VND</p>
                <p className="desc">Previous transactions processing. Last payments may not be included.</p>
                <div className="summary">
                    <div className="item">
                        <div className="itemTitle">Target</div>
                        <div className="itemResult negative">
                            <KeyboardArrowDownIcon fontSize="small" />
                            <div className="resultAmount">$12.4k</div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="itemTitle">Last Month</div>
                        <div className="itemResult positive">
                            <KeyboardArrowUpOutlinedIcon fontSize="small" />
                            <div className="resultAmount">
                                {month?.length > 0 ? month[0].totalRevenue : 0} VND
                            </div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="itemTitle">Last Year</div>
                        <div className="itemResult positive">
                            <KeyboardArrowUpOutlinedIcon fontSize="small" />
                            <div className="resultAmount">
                                {year?.length > 0 ? year[0].totalRevenue : 0} VND
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Featured
