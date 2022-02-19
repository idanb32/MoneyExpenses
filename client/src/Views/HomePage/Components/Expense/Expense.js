import './Expense.css'


const Expense = (props) => {
    return (<div className="Expense">
        <div className="amount">Amout: {props.Amount}</div>
        <div className="DayOfPurches">Day of purches: {props.DayOfPurches}</div>
        <div className="NameOfShop">Name of the Shop: {props.NameOfShop}</div>
    </div>)

}

export default Expense;
