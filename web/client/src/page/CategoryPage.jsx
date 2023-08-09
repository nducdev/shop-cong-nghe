import '../styles/CategoryPage.scss'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MdKeyboardDoubleArrowRight, MdKeyboardDoubleArrowLeft } from 'react-icons/md'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import Banner from '../assets/banner.jpeg'
import ProductCard from '../components/Card/ProductCard'
import { findProductByType } from '../api/productApi'

const CategoryPage = () => {
    const [products, setProducts] = useState()
    const [totalCount, setTotalCount] = useState()
    const [skip, setSkip] = useState(0)

    const location = useLocation()

    useEffect(() => {
        const data = JSON.stringify({
            type: location.pathname.split('/category/')[1]
        })

        const fetchProducts = async () => {
            try {
                await findProductByType(data, skip).then((data) => {
                    setProducts(data?.data?.products)
                    setTotalCount(data?.data?.count)
                })
            } catch (error) {
                console.log(error)
            }
        }

        fetchProducts()

        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        <div className="category-container">
            <Header />
            <div className="body-container">
                <div className="banner-section">
                    <img src={Banner} alt="" draggable="false" />
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
            <Footer />
        </div>
    )
}

export default CategoryPage
