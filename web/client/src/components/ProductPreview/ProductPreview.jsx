import '../../styles/ProductPreview.scss'
import { useEffect, useState, useMemo } from 'react'

const ProductPreview = (props) => {
    const image = useMemo(
        () => [
            { id: 0, value: props.image1 },
            { id: 1, value: props.image2 },
            { id: 2, value: props.image3 },
            { id: 3, value: props.image4 }
        ],
        [props.image1, props.image2, props.image3, props.image4]
    )

    const [sliderData, setSliderData] = useState()

    useEffect(() => {
        if (!sliderData) {
            setSliderData(image[0].value)
        }
    }, [sliderData, image])

    const handleClick = (index) => {
        console.log(image[0].value)

        const slider = image[index]
        setSliderData(slider.value)
    }

    return (
        <div className="product-preview-container">
            <img src={sliderData} alt="" draggable="false" />
            <div className="image-preview-wrapper">
                {image.map((data, index) => (
                    <div className="image-container" key={index} onClick={() => handleClick(index)}>
                        <img
                            src={data.value}
                            alt="preview"
                            draggable="false"
                            className={data.id === index ? 'clicked' : ''}
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ProductPreview
