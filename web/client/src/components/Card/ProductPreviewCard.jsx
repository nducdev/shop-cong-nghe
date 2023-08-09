import '../../styles/ProductPreviewCard.scss'

const ProductPreviewCard = (props) => {
    return (
        <div className="product-pv-card-container">
            <div className="card-header">
                <img src={props.image} alt="" />
            </div>
            <div className="card-footer">
                <span>{props.name}</span>
                <span>{props.price} VND</span>
            </div>
        </div>
    )
}

export default ProductPreviewCard
