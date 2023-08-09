import './CreateProduct.scss'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MdCloudUpload } from 'react-icons/md'
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'
import { storage } from '../../config/firebase-config'
import Navbar from '../navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'
import { createProduct } from '../../api/productApi'
import { createAxios } from '../../api/axiosInstance'
import { loginSuccess } from '../../redux/slices/authSlice'

const CreateProduct = () => {
    const auth = useSelector((state) => state.auth.login.currentUser)
    const dispatch = useDispatch()

    const axiosJWT = createAxios(auth, dispatch, loginSuccess)

    const [imageUpload, setImageUpload] = useState()
    const [selectedImage, setSelectedImage] = useState()
    const [sliderData, setSliderData] = useState()
    const [name, setName] = useState()
    const [brand, setBrand] = useState()
    const [price, setPrice] = useState()
    const [item, setItem] = useState()
    const [desc, setDesc] = useState()
    const [detail, setDetail] = useState()
    const [images, setImages] = useState()
    const [type, setType] = useState()
    const [success, setSuccess] = useState(false)

    const handleSelectedFile = (e) => {
        const selectedFile = e.target.files
        const imageUrls = []

        for (let i = 0; i < selectedFile.length; i++) {
            const image = selectedFile[i]
            const imageUrl = URL.createObjectURL(image)
            console.log(imageUrl)
            imageUrls.push(imageUrl)
        }

        setSelectedImage(imageUrls)
        setImageUpload(selectedFile)

        if (imageUrls && !sliderData) {
            setSliderData(imageUrls[0])
        }

        console.log(imageUrls)
    }

    const handleClick = (index) => {
        const slider = selectedImage[index]
        setSliderData(slider)
    }

    const handleUploadImages = async () => {
        const imageUrlArray = []

        for (let i = 0; i < imageUpload.length; i++) {
            const imageRef = ref(storage, `image-${Date.now()}.png`)

            await uploadBytes(imageRef, imageUpload[i])
                .then(async () => {
                    await getDownloadURL(imageRef)
                        .then((url) => {
                            imageUrlArray.push(url)
                        })
                        .catch((error) => {
                            console.log('Error getting download URL: ', error)
                        })
                })
                .catch((error) => console.log(error))
        }

        setImages(imageUrlArray)
    }

    const displayResult = async (e) => {
        e.preventDefault()

        await handleUploadImages()
            .then(async () => {
                const data = JSON.stringify({
                    name: name,
                    price: price,
                    desc: desc,
                    item: item,
                    type: type,
                    image: images,
                    brand: brand,
                    detail: detail
                })

                console.log(data)

                const res = await createProduct(data, auth?.accessToken, axiosJWT)

                if (res?.data?.status === 'success') {
                    setSuccess(true)
                }
            })
            .catch((error) => {
                console.log(error)
            })
    }

    return (
        <div className="create-product">
            <Sidebar />
            <div className="create-container">
                <Navbar />
                <div className="body-page">
                    <form onSubmit={displayResult}>
                        <div className="right-section">
                            <div className="right-wrapper">
                                {selectedImage ? (
                                    <>
                                        <div className="product-preview-container">
                                            <img src={sliderData} alt="" draggable="false" />
                                            <div className="image-preview-wrapper">
                                                {selectedImage.map((data, index) => (
                                                    <div
                                                        className="image-container"
                                                        key={index}
                                                        onClick={() => handleClick(index)}
                                                    >
                                                        <img
                                                            src={data}
                                                            alt="preview"
                                                            draggable="false"
                                                            className={data === sliderData ? 'clicked' : ''}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="open-image-wrapper">
                                            <label className="upload-image">
                                                <div className="upload-icon">
                                                    <MdCloudUpload size={60} />
                                                    <span>Browse Image/Video to upload.</span>
                                                    <span className="text">Or drag and drop</span>
                                                </div>
                                                <input
                                                    type="file"
                                                    name="image"
                                                    accept="image/*"
                                                    className="upload-input"
                                                    onChange={handleSelectedFile}
                                                    multiple
                                                />
                                            </label>
                                        </div>
                                    </>
                                )}
                                <div className="btn-wrapper">
                                    <button>Create</button>
                                </div>
                            </div>
                        </div>
                        <div className="middle-section"></div>
                        <div className="left-section">
                            <div className="text-field">
                                <label htmlFor="product-name">Product's Name</label>
                                <input
                                    type="text"
                                    placeholder="Type here..."
                                    id="product-name"
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="text-field">
                                <label htmlFor="product-brand">Product's Brand</label>
                                <input
                                    type="text"
                                    placeholder="Type here..."
                                    id="product-brand"
                                    onChange={(e) => setBrand(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="double-field">
                                <div className="text-field">
                                    <label htmlFor="product-price">Product's Price</label>
                                    <input
                                        type="text"
                                        placeholder="Type here... (VND)"
                                        id="product-price"
                                        onChange={(e) => setPrice(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="text-field">
                                    <label htmlFor="product-item">Product's Item</label>
                                    <input
                                        type="text"
                                        placeholder="Type here..."
                                        id="product-item"
                                        onChange={(e) => setItem(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="text-field">
                                    <label htmlFor="product-type">Product's Type</label>
                                    <select
                                        name=""
                                        id="product-type"
                                        onChange={(e) => {
                                            setType(e.target.value)
                                            console.log(type)
                                        }}
                                    >
                                        <option value="">Select option</option>
                                        <option value="phone">Điện thoại</option>
                                        <option value="pc">Laptop, PC</option>
                                        <option value="phukien">Phụ Kiện</option>
                                        <option value="tivi">Tivi</option>
                                        <option value="other">Khác</option>
                                    </select>
                                </div>
                            </div>
                            <div className="text-field">
                                <label htmlFor="product-desc">Product's Description</label>
                                <input
                                    type="text"
                                    placeholder="Type here..."
                                    id="product-desc"
                                    onChange={(e) => setDesc(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="text-field">
                                <label>Product Detail's</label>
                                <textarea
                                    cols="30"
                                    rows="10"
                                    placeholder="Type here..."
                                    onChange={(e) => {
                                        setDetail(e.target.value)
                                        console.log(e.target.value)
                                    }}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateProduct
