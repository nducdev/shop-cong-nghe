import './table.scss'
import { getAllOrder } from '../../api/orderApi'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createAxios } from '../../api/axiosInstance'
import { loginSuccess } from '../../redux/slices/authSlice'

const List = () => {
    const auth = useSelector((state) => state.auth.login.currentUser)
    const dispatch = useDispatch()
    const axiosJWT = createAxios(auth, dispatch, loginSuccess)

    const [orderData, setOrderData] = useState()
    const [userData, setUserData] = useState()

    useEffect(() => {
        const fetchLastOrder = async () => {
            const res = await getAllOrder(auth?.accessToken, axiosJWT)
            setOrderData(res?.data?.orderData)
            setUserData(res?.data?.userData)
        }

        fetchLastOrder()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const formatDate = (dateString) => {
        const options = { month: 'long', day: 'numeric' }
        const date = new Date(dateString)

        const formattedDate = date.toLocaleDateString('en-US', options)
        return formattedDate
    }

    return (
        <TableContainer component={Paper} className="table">
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell className="tableCell">ID</TableCell>
                        <TableCell className="tableCell">Product</TableCell>
                        <TableCell className="tableCell">Customer</TableCell>
                        <TableCell className="tableCell">Date</TableCell>
                        <TableCell className="tableCell">Quantity</TableCell>
                        <TableCell className="tableCell">Payment Method</TableCell>
                        <TableCell className="tableCell">Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orderData &&
                        orderData.map((item) => {
                            const user = userData?.find((u) => u._id === item.userID)
                            const formattedDate = formatDate(item.createdAt)

                            return (
                                <TableRow key={item._id}>
                                    <TableCell className="tableCell">{item._id}</TableCell>
                                    <TableCell className="tableCell">
                                        <div className="cellWrapper">{item.name}</div>
                                    </TableCell>
                                    <TableCell className="tableCell">{user?.username}</TableCell>
                                    <TableCell className="tableCell">{formattedDate}</TableCell>
                                    <TableCell className="tableCell">{item.quantity}</TableCell>
                                    <TableCell className="tableCell">{item.pay_method}</TableCell>
                                    <TableCell className="tableCell">
                                        <span
                                            className={
                                                item.state === 'in progress'
                                                    ? 'status in-progress'
                                                    : `status ${item.state}`
                                            }
                                        >
                                            {item.state}
                                        </span>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default List
