import '../../styles/ProductSpecification.scss'

const ProductSpecification = (props) => {
    return (
        <div className="product-specification-container">
            <div className="product-info">
                <span>{props.name} Specification</span>
                <div className="detail-text">{props.detail}</div>
            </div>
        </div>
    )
}

export default ProductSpecification
