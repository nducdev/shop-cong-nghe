import '../styles/DetailProduct.scss'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'
import ProductPreview from '../components/ProductPreview/ProductPreview'
import ProductDescription from '../components/ProductPreview/ProductDescription'
import { findProductWithField, getProductDetail } from '../api/productApi'
import ProductSpecification from '../components/ProductPreview/ProductSpecification'
import ProductPreviewCard from '../components/Card/ProductPreviewCard'

const DetailProduct = () => {
    const [product, setProduct] = useState(null)
    const [preview, setPreview] = useState(null)

    const location = useLocation()

    useEffect(() => {
        const data = JSON.stringify({
            productID: location.pathname.substring(16)
        })

        const fetchProduct = async () => {
            await getProductDetail(data).then((data) => {
                setProduct(data?.data?.product)
            })
        }

        fetchProduct()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
        const data = JSON.stringify({
            brand: product?.brand
        })

        const fetchProductWithField = async () => {
            try {
                await findProductWithField(data).then((data) => {
                    setPreview(data?.data?.products)
                })
            } catch (error) {
                console.log(error)
            }
        }

        fetchProductWithField()
    }, [product])

    return (
        <div className="product-detail-container">
            <Header />
            <div className="product-overview">
                <div className="right-section">
                    <ProductPreview
                        image1={product?.image[0]}
                        image2={product?.image[1]}
                        image3={product?.image[2]}
                        image4={product?.image[3]}
                    />
                </div>
                <div className="middle-section"></div>
                <div className="left-section">
                    <ProductDescription
                        id={product?._id}
                        name={product?.name}
                        desc={product?.desc}
                        brand={product?.brand}
                        item={product?.item}
                        price={product?.price}
                    />
                </div>
            </div>
            <div className="product-specification">
                <div className="left-section">
                    <ProductSpecification detail={product?.detail} name={product?.name} />
                </div>
                <div className="middle-section"></div>
                <div className="right-section">
                    {preview &&
                        preview.map((item, i) => (
                            <Link to={`/product-detail/${item._id}`}>
                                <ProductPreviewCard
                                    key={item?._id}
                                    image={item?.image[0]}
                                    name={item?.name}
                                    price={item?.price}
                                />
                            </Link>
                        ))}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default DetailProduct
