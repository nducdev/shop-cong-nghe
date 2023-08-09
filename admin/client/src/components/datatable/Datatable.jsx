import './datatable.scss'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MdKeyboardDoubleArrowRight, MdKeyboardDoubleArrowLeft } from 'react-icons/md'
import { deleteUser, getAllUser } from '../../api/userApi'
import { useDispatch, useSelector } from 'react-redux'
import { createAxios } from '../../api/axiosInstance'
import { loginSuccess } from '../../redux/slices/authSlice'

const Datatable = () => {
    const auth = useSelector((state) => state.auth.login.currentUser)
    const dispatch = useDispatch()
    const axiosJWT = createAxios(auth, dispatch, loginSuccess)

    const [skip, setSkip] = useState(0)
    const [data, setData] = useState()
    const [totalCount, setTotalCount] = useState()

    useEffect(() => {
        const fetchAllUser = async () => {
            await getAllUser(auth?.accessToken, axiosJWT, skip).then((data) => {
                setData(data?.data?.userData)
                setTotalCount(data?.data?.count)
            })
        }

        fetchAllUser()

        console.log('count', totalCount)
    }, [skip])

    const handleDeleteUser = async (userID) => {
        const data = JSON.stringify({
            userID: userID
        })
        await deleteUser(data, auth?.accessToken, axiosJWT)
        window.location.reload()
    }

    const handleNext = () => {
        if (skip + 9 >= totalCount) {
            return // Do nothing if on the last page or beyond
        }
        setSkip((prevSkip) => prevSkip + 9)
    }

    const handlePrevious = () => {
        if (skip === 0) {
            return
        }
        setSkip((prevSkip) => prevSkip - 9)
    }

    return (
        <div className="datatable">
            <table className="styled-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Role</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data &&
                        data.map((item) => (
                            <tr key={item._id}>
                                <td>{item._id}</td>
                                <td>
                                    <img src={item.avatar} alt="avatar" />
                                    <span>{item.name}</span>
                                </td>
                                <td>{item.username}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>{item.role}</td>
                                <td>
                                    <Link to={`/users/${item._id}`}>
                                        <button className="view-btn">View</button>
                                    </Link>
                                    <button className="delete-btn" onClick={() => handleDeleteUser(item._id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <div className="pagination-btn">
                <button className="icon">
                    <MdKeyboardDoubleArrowLeft size={25} onClick={handlePrevious} />
                </button>
                <button className="icon">
                    <MdKeyboardDoubleArrowRight size={25} onClick={handleNext} />
                </button>
            </div>
        </div>
    )
}

export default Datatable
