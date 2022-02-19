import React from "react";
import axios from "axios";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Button from "../../GlobalComponents/Button/Button";
import AddExpenseInput from "./AddExpenseInput/AddExpenseInput";
import './AddExpensePage.css'



const AddExpensePage = (props) => {
    const [amount,setAmount] = useState(0);
    const [amountError,setAmountError] = useState();
    const [storeName,setStoreName] = useState("");
    const [date,setDate]=useState(new Date());

    const handleAmountChanged =(e)=>{
        setAmount(e.target.value);
    }

    const handleStoreNameChanged =(e)=>{
        setStoreName(e.target.value);
    }

    const handleAdd = ()=>{
        if(amount == 0){
            setAmountError("Not a valid amount")
        }
        else{
            axios.post("http://localhost:8080/expenses/AddExpense",
            {
                id:props.id,
                Amount:amount,
                DayOfPurches:date,
                NameOfShop:storeName
            })
            .then((resault) =>{
                window.alert("Succsesfully added an expense");
                cleanInputs();
            })
            .catch((err)=>{
                console.log(err);
            });
        }
    }

    const cleanInputs=()=>{
        setAmountError();
        setAmount(0);
        setStoreName("");
        setDate(new Date());
    }

    const handleCancel = ()=>{
        if(amount!=0){
         if(window.confirm("Are you sure you want to cancel? your input data will be removed if so")){
            window.location.href = 'http://localhost:3000/';
         }
        }
        else{
            window.location.href = 'http://localhost:3000/';
        }
    }


    return (<div className="ExpensePage">
        <div className="InputsExpense">
            <AddExpenseInput header="Amount, must enter" 
            onChange={handleAmountChanged}
            type="number" value={amount} error ={amountError} />
            <AddExpenseInput header="Store name, optinal"
            onChange={handleStoreNameChanged} 
            value={storeName}/>
            <DatePicker selected={date} 
            onChange={(newDate) => setDate(newDate)}/>

        </div>
        <div className="ButtonsExpense">
            <Button  onClick={handleAdd}>Add expense</Button>
            <Button  onClick ={handleCancel}>Cancel</Button>
        </div>
    </div>)

}
export default AddExpensePage;