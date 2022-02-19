import Input from "../../../GlobalComponents/Input/Input";
import './AddExpenseInput.css'

const AddExpenseInput = (props) => {
    const renderError = () => {
        if (props.error)
            return <div className="Validtor">{props.error} </div>
    }

    return (<div className="AddExpenseInput">
        <h5 className="header-5">{props.header} : </h5>
        <div className="expenseInput">
            <Input
                value={props.value}
                onChange={props.onChange}
                type={props.type}
                placeholder={props.placeholder}
            />
            {renderError()}
        </div>
    </div>)

}
export default AddExpenseInput;