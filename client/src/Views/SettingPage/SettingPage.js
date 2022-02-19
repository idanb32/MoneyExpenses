import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../GlobalComponents/Button/Button";
import SettingInput from "./Components/SettingInput/SettingInput";
import './SettingPage.css'


const SettingPage = (props) => {
    const [currenName, setCurrenName] = useState();
    const [currentBalance, setCurrentBalance] = useState();
    const [currentDayOfTracking, setCurrentDayOfTracking] = useState();

    const [newName, setNewName] = useState("");
    const [newBalance, setNewBalance] = useState("");
    const [newDayOfTracking, setNewDayOfTracking] = useState("");

    const handleNameChange = (e) => {
        setNewName(e.target.value);
    }
    const handleBalanceChange = (e) => {
        setNewBalance(e.target.value);
    }
    const handleDayChange = (e) => {
        setNewDayOfTracking(e.target.value);
    }

    useEffect(() => {
        getAndShowPerson();
    }, []);

    const getAndShowPerson = () => {
        axios.post(("http://localhost:8080/expenses/GetPerson"),
            {
                "id": props.id
            })
            .then((resault) => {
                setCurrenName(resault.data.Name);
                setCurrentBalance(resault.data.Balance);
                let dayOfTrackString = resault.data.DayOfTracking;
                let dateOfTrack = new Date(dayOfTrackString);
                let dayOfTrack = dateOfTrack.getDate();
                setCurrentDayOfTracking(dayOfTrack);
            }).catch((err) => {
                console.log(err);
            })
    }

    const updatePerson = () => {
        if (newName != "" && newBalance != "" && newDayOfTracking != "") {
            let date = new Date(Date.now());
            date.setMonth(date.getMonth() + 1);
            date.setDate(newDayOfTracking);
            let newPerson = {
                id: props.id,
                Name: newName,
                Balance: newBalance,
                DayOfTracking: date
            }
            axios.post(("http://localhost:8080/expenses/UpdatePerson"),
                newPerson
            )
                .then((resault) => {
                    setCurrenName(resault.data.Name);
                    setCurrentBalance(resault.data.Balance);
                    let dayOfTrackString = resault.data.DayOfTracking;
                    let dateOfTrack = new Date(dayOfTrackString);
                    let dayOfTrack = dateOfTrack.getDate();
                    setCurrentDayOfTracking(dayOfTrack);
                }).catch((err) => {
                    console.log(err);
                })
        }
    }


    return (<div className="SettingPage">
        <SettingInput inputOnChange={handleNameChange} inputValue={newName} inputHeader="Name" cuurentValue={currenName} />
        <SettingInput type="number" inputOnChange={handleBalanceChange} inputValue={newBalance} inputHeader="Balance" cuurentValue={currentBalance} />
        <SettingInput type="number" inputOnChange={handleDayChange} inputValue={newDayOfTracking} inputHeader="Day of paymanet" cuurentValue={currentDayOfTracking} />
        <div className="settingButtons">
            <Button onClick={updatePerson}>Save</Button>
            <Link to="/AddExpensePage">
                <Button >Move to add expense </Button>
            </Link>
            <Link to="/">
                <Button >Move to Home </Button>
            </Link>
        </div>
    </div>)
}


export default SettingPage;