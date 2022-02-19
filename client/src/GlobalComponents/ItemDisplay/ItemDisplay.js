import './ItemDisplay.css'


const ItemDisplay = (props) => {
    return (
        <div className="ItemDisplay">
            <h3 className='header-3'>{props.header}</h3>
            <div className="content">
                {props.children}
            </div>
        </div>
    )
}
export default ItemDisplay;