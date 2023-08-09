import '../../styles/ProductCard.scss'
import { useState } from 'react'
import { AiOutlineHeart, AiFillHeart, AiFillStar } from 'react-icons/ai'

const ProductCard = (props) => {
    const [heart, setHeart] = useState(false)

    const handleSetHeart = () => {
        setHeart(!heart)
    }

    return (
        <div className="card-container">
            <div className="card-image">
                <img src={props.image} alt="" draggable="false" />
                <div className="icon" onClick={() => handleSetHeart()}>
                    {heart ? <AiFillHeart size={18} color="EF4653" /> : <AiOutlineHeart size={18} />}
                </div>
            </div>
            <div className="card-detail">
                <div className="intro">
                    <div className="name">{props.name}</div>
                    <div className="price">
                        <span>$</span>
                        <span>{props.price}</span>
                    </div>
                </div>
                <div className="detail">
                    <span>{props.desc}</span>
                </div>
                <div className="review">
                    <div className="icon">
                        <AiFillStar size={15} color="yellow" />
                        <AiFillStar size={15} color="yellow" />
                        <AiFillStar size={15} color="yellow" />
                        <AiFillStar size={15} color="yellow" />
                        <AiFillStar size={15} color="yellow" />
                    </div>
                    <span>(121)</span>
                </div>
                <div className="add-btn">Add to Cart</div>
            </div>
        </div>
    )
}

export default ProductCard
