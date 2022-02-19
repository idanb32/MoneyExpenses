import Input from "../../../../GlobalComponents/Input/Input";
import React from "react";
import './SettingInput.css'

const SettingInput = (props) => {
    return (<div className="SettingInput">
        <div className="current">
            <h5>Current {props.inputHeader} : </h5>
            <div>{props.cuurentValue} </div>
        </div>
        <div className="mainInput">
            <h5 className="header-5">{props.inputHeader} </h5>
            <Input   
            onChange={props.inputOnChange}
            value={props.inputValue}
            placeholder={props.cuurentValue}  
            type = {props.type}/>
        </div>
    </div>)


}

export default SettingInput;

