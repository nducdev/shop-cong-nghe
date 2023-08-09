import '../styles/ResultPage.scss'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IoIosArrowDown } from 'react-icons/io'
import { FiFilter } from 'react-icons/fi'
import { MdKeyboardDoubleArrowRight, MdKeyboardDoubleArrowLeft } from 'react-icons/md'
import ProductCard from '../components/Card/ProductCard'
import Banner from '../assets/banner.jpeg'
import Phone from '../assets/phone.jpeg'
import PC from '../assets/pc.jpeg'
import TV from '../assets/tivi.webp'
import HeadPhone from '../assets/headphone.jpeg'
import Other from '../assets/other.jpeg'
import { getAllProducts } from '../api/productApi'

const ResultPage = () => {
    const [products, setProducts] = useState()
    const [totalCount, setTotalCount] = useState()
    const [skip, setSkip] = useState(0)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                await getAllProducts(skip).then((data) => {
                    setProducts(data?.data?.productData)
                    setTotalCount(data?.data?.count)
                })
            } catch (error) {
                console.log(error)
            }
        }

        fetchProducts()
    }, [skip])

    const handleNext = () => {
        if (skip + 12 >= totalCount) {
            return
        }

        setSkip((prevSkip) => prevSkip + 12)
    }

    const handlePrevious = () => {
        if (skip === 0) {
            return
        }

        setSkip((prevSkip) => prevSkip - 12)
    }

    return (
        <div className="result-container">
            <div className="body-section">
                <div className="banner-section">
                    <img src={Banner} alt="" draggable="false" />
                </div>
                <div className="category-section">
                    <span>Category</span>
                    <div className="category-wrapper">
                        <div className="left-section">
                            <Link to="/category/phone">
                                <div className="list-category-container">
                                    <img src={Phone} alt="" />
                                    <span>Điện thoại</span>
                                </div>
                            </Link>
                            <Link to="/category/pc">
                                <div className="list-category-container">
                                    <img src={PC} alt="" />
                                    <span>Laptop, PC</span>
                                </div>
                            </Link>
                            <Link to="/category/phukien">
                                <div className="list-category-container">
                                    <img src={HeadPhone} alt="" />
                                    <span>Phụ kiện</span>
                                </div>
                            </Link>
                        </div>
                        <div className="right-section">
                            <Link to="/category/tivi">
                                <div className="list-category-container">
                                    <img src={TV} alt="" />
                                    <span>Tivi</span>
                                </div>
                            </Link>
                            <div className="list-category-container">
                                <img src={Other} alt="" />
                                <span>Khác</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="option-section">
                    <div className="right-section">
                        <div className="list-item">
                            <span>Price</span>
                            <div className="icon">
                                <IoIosArrowDown />
                            </div>
                        </div>
                        <div className="list-item">
                            <span>Review</span>
                            <div className="icon">
                                <IoIosArrowDown />
                            </div>
                        </div>
                        <div className="list-item">
                            <span>Location</span>
                            <div className="icon">
                                <IoIosArrowDown />
                            </div>
                        </div>
                        <div className="list-item">
                            <span>Offer</span>
                            <div className="icon">
                                <IoIosArrowDown />
                            </div>
                        </div>
                        <div className="list-item">
                            <span>All Filters</span>
                            <div className="icon">
                                <FiFilter />
                            </div>
                        </div>
                    </div>
                    <div className="left-section">
                        <div className="sort">
                            <span>Sort by</span>
                            <div className="icon">
                                <IoIosArrowDown />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="product-section">
                    <span>Recommended For You!</span>
                    <div className="product-grid">
                        {products?.map((product) => {
                            return (
                                <Link to={`/product-detail/${product._id}`} key={product._id}>
                                    <ProductCard
                                        name={product.name}
                                        desc={product.desc}
                                        item={product.item}
                                        price={product.price}
                                        image={product.image[0]}
                                        review={product.review}
                                        brand={product.brand}
                                    />
                                </Link>
                            )
                        })}
                    </div>
                    <div className="pagination-btn">
                        <button className="icon" onClick={handlePrevious}>
                            <MdKeyboardDoubleArrowLeft size={30} />
                        </button>
                        <button className="icon" onClick={handleNext}>
                            <MdKeyboardDoubleArrowRight size={30} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResultPage
