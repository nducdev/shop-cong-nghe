import './datatable.scss'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BiPlus } from 'react-icons/bi'
import { MdKeyboardDoubleArrowRight, MdKeyboardDoubleArrowLeft } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getAllProduct } from '../../api/productApi'
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
        const fetchAllProduct = async () => {
            await getAllProduct(skip).then((data) => {
                setData(data?.data?.productData)
                setTotalCount(data?.data?.count)
            })
        }

        fetchAllProduct()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [skip])

    const handleDeleteProduct = async (productID) => {
        const data = JSON.stringify({
            productID: productID
        })

        const res = await deleteProduct(data, auth?.accessToken, axiosJWT)
        console.log(res)
        console.log(productID)
        window.location.reload()
    }

    const handleNext = () => {
        if (skip + 10 >= totalCount) {
            return // Do nothing if on the last page or beyond
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
                        <th>Product</th>
                        <th>Brand</th>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data &&
                        data.map((item) => (
                            <tr key={item._id}>
                                <td style={{ padding: '16px 15px' }}>{item._id}</td>
                                <td style={{ padding: '16px 15px' }}>
                                    <Link to="/">{item.name}</Link>
                                </td>
                                <td style={{ padding: '16px 15px' }}>{item.brand}</td>
                                <td style={{ padding: '16px 15px' }}>{item.item}</td>
                                <td style={{ padding: '16px 15px' }}>{item.price}</td>
                                <td style={{ padding: '16px 15px' }}>{item.desc}</td>
                                <td style={{ padding: '16px 15px' }}>
                                    <Link to={`/products/${item._id}`}>
                                        <button className="view-btn">View</button>
                                    </Link>
                                    <button
                                        className="delete-btn"
                                        onClick={() => handleDeleteProduct(item._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>
            <div className="pagination-btn">
                <Link to="/products/create-product">
                    <button className="add-new">
                        <div className="icon">
                            <BiPlus size={22} />
                        </div>
                        <span>Add New</span>
                    </button>
                </Link>
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
