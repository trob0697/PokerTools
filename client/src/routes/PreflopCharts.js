import React, { useState } from "react";
import { ButtonGroup, Button } from "react-bootstrap";

import RangeChart from "../components/RangeChart";
import Dice from "../assets/images/dice.png"

function PreflopCharts(){
    const [selections, setSelections] = useState(["", "", "", ""]);
    const [randomizer, setRandomizer] = useState("--");

    const games = ["Online Cash", "MTT"];

    const onlineCashOptions = [
        ["RFI", "VS RFI", "RFI VS 3-Bet", " VS 4-Bet"],
        ["UTG", "HJ", "CO", "BTN", "SB", "BB"],
        ["UTG", "HJ", "CO", "BTN", "SB", "BB"]
    ];

    const onClickButton = (option, param) => {
        const newSelections = [...selections];
        newSelections[option] = param;
        
        if(option === 1 && param === "RFI"){
            option++;
            newSelections[option] = "None";
        }

        for(let i = option+1; i < selections.length; i++){
            newSelections[i]= "";
        }

        setSelections(newSelections);
    }

    const onClickRandomize = () => {
        const num = Math.floor((Math.random() * 100) + 1).toString();
        setRandomizer(num);
    }

    return(
        <div>
            <div className="preflop-charts-btns-container">
                <div className="btn-group-spacing">
                {games.map((item, index) => { return ( 
                    <Button className="btn-spacing" variant={(selections[0] === item ? "light" : "secondary")} onClick={() => onClickButton(0, item)} key={index}>{item}</Button>
                )})}
                </div>
                {onlineCashOptions.map((item, index) => { return (
                <div className="btn-group-spacing" key={index+1}>
                    <ButtonGroup size="sm">
                    {item.map((subitem, subindex) => { return (
                        <Button variant={(selections[index+1] === subitem ? "light" : "secondary")} disabled={!selections[index].length || ( index === 1 && selections[2] === 'None') ? true : false} onClick={() => onClickButton(index+1, subitem)} key={subindex}>{subitem}</Button>
                    )})}
                    </ButtonGroup>
                </div>
                )})}
                <div className="btn-group-spacing">
                    <ButtonGroup size="sm">
                        <Button variant="secondary" onClick={() => onClickRandomize()}><img src={Dice} alt="dice" height="17.5em"/></Button>
                        <Button className="btn-inactive" variant="secondary">{randomizer}</Button>
                    </ButtonGroup>
                </div>
            </div>
            <RangeChart selections={selections}/>
        </div>
    )
}

export default PreflopCharts;