import './Button.css'

const Button =(props)=>{

    return(<div className='btnContainer'>
        <button onClick={props.onClick} className="btn"> {props.children} </button>
    </div>)


}
export default Button;