import React from "react";
import './HomePage.css';
import { useEffect, useState } from "react";
import axios from "axios";
import Expense from "./Components/Expense/Expense";
import ItemDisplay from "../../GlobalComponents/ItemDisplay/ItemDisplay";
import Button from "../../GlobalComponents/Button/Button";
import { Link } from "react-router-dom";

const HomePage = (props) => {
    const [name, setName] = useState("");
    const [totalExpenses, setTotalExpenses] = useState();
    const [balanceAtEndOfMonth, setBalanceAtEndOfMonth] = useState();
    const [currentMonthlyExpenses, setCurrentMonthlyExpenses] = useState([]);
    const [fullDetailesFlag, setFullDetailesFlag] = useState(false);
    const [buttonMsg, setButtonMsg] = useState("Show more detailes about expenses")
  
    const handleBtnClick = () => {
        setFullDetailesFlag(!fullDetailesFlag);
        if (fullDetailesFlag)
            setButtonMsg("Show more detailes about expenses");
        else
            setButtonMsg("Show less detailes");
    }

    const getPerson = () => {
        axios.post(("http://localhost:8080/expenses/GetPerson"),
            {
                "id": props.id
            })
            .then((resault) => {
                setName(resault.data.Name);
                setTotalExpenses(resault.data.AmountToPayThisMonth);
                setBalanceAtEndOfMonth(resault.data.Balance - resault.data.AmountToPayThisMonth);
            })
            .catch((error) => {
                console.log(error);
            });
        axios.post(("http://localhost:8080/expenses/GetPersonExpenses"),
            {
                "id": props.id
            })
            .then((resault2) => {
                let tmp = resault2.data.map((item) => {
                    let newItem = {
                        Amount: item.Amount,
                        NameOfShop: item.NameOfShop,
                        DayOfPurches: item.DayOfPurches
                    }
                    return newItem
                })
                setCurrentMonthlyExpenses(tmp);
            })
            .catch((error2) => {
                console.log(error2);
            });
    }

    useEffect(() => {
        getPerson();
    }, [])

    const renderExpense = () => {
        if (fullDetailesFlag) {
            return currentMonthlyExpenses.map((item) => {
                return <Expense Amount={item.Amount}
                    DayOfPurches={item.DayOfPurches}
                    NameOfShop={item.NameOfShop} />
            });
        }
    }

    const handlePay = () => {
        axios.post(("http://localhost:8080/expenses/PayIfNeeded"),
            {
                "id": props.id
            })
            .then((resault) => {
                setName(resault.data.Name);
                setTotalExpenses(resault.data.AmountToPayThisMonth);
                setBalanceAtEndOfMonth(resault.data.Balance - resault.data.AmountToPayThisMonth);
            })
            .catch((error) => {
                console.log(error);
            });
        axios.post(("http://localhost:8080/expenses/GetPersonExpenses"),
            {
                "id": props.id
            })
            .then((resault2) => {
                let tmp = resault2.data.map((item) => {
                    let newItem = {
                        Amount: item.Amount,
                        NameOfShop: item.NameOfShop,
                        DayOfPurches: item.DayOfPurches
                    }
                    return newItem
                })
                setCurrentMonthlyExpenses(tmp);
            })
            .catch((error2) => {
                console.log(error2);
            });
    }

    return (<div className="HomePage">
        <div className="displies">
        <ItemDisplay header="Name:">{name}</ItemDisplay>
        <ItemDisplay header="Total expenses this month:">{totalExpenses}</ItemDisplay>
        <ItemDisplay header="Your balance after this month payment:">{balanceAtEndOfMonth}</ItemDisplay>
        <Button onClick={handleBtnClick}>{buttonMsg} </Button>
        {renderExpense()}
        <Button onClick={handlePay} >Pay if time comed</Button>
        </div>
        <div className="homeButtons">
            <Link to="/AddExpensePage">
                <Button >Move to add expense </Button>
            </Link>
            <Link to="/Setting">
                <Button >Move to setting </Button>
            </Link>
            
        </div>
    </div>)

}
export default HomePage;