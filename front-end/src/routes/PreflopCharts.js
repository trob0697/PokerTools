import React, { useState } from "react";
import { ButtonGroup, Button } from "react-bootstrap";

import RangeChart from "../components/RangeChart";
import Dice from "../assets/dice.png";

function PreflopCharts(){
    const [selections, setSelections] = useState(["Upswing Poker", "", "", ""]);
    const [randomizer, setRandomizer] = useState("--");
    const [frequencies, setFrequencies] = useState(["??", "??", "??", "??"]);
    const [freqFade, setFreqFade] = useState(true);

    const charts = ["Upswing Poker", "Carrot Corner"];

    const rangeButtons = {
        "Upswing Poker": [
            ["RFI", "VS RFI", "RFI VS 3-Bet", "VS 4-Bet"],
            ["UTG", "HJ", "CO", "BTN", "SB", "BB"],
            ["UTG", "HJ", "CO", "BTN", "SB", "BB"]
        ],
        "Carrot Corner": [
            ["RFI", "VS RFI", "RFI VS 3-Bet", "VS 4-Bet"],
            ["UTG", "HJ", "CO", "BTN", "SB", "BB"],
            ["UTG", "HJ", "CO", "BTN", "SB", "BB"]
        ]
    };

    const onClickButton = (option, index) => {
        const tempSelections = [...selections];
        tempSelections[index] = option;
        
        if(index === 1 && option === "RFI"){
            index++;
            tempSelections[index] = "None";
        }

        for(let i = index+1; i < selections.length; i++){
            tempSelections[i]= "";
        }

        setSelections(tempSelections);
    }

    const onClickRandomize = () => {
        const num = Math.floor((Math.random() * 100) + 1).toString();
        setRandomizer(num);
    }

    const onHoverEnter = (freq) => {
        let na = 100 - freq[0] - freq[1] - freq[2];
        freq.push(na.toString())
        setFrequencies(freq);
        setFreqFade(false);
    }

    const onHoverExit = () => {
        setFrequencies(["??", "??", "??", "??"]);
        setFreqFade(true);
    }

    return(
        <div>
            <div className="preflop-charts-btns-container">
                <div className="btn-group-spacing">
                {charts.map((item, i) => { return ( 
                    <Button className="btn-spacing" variant={(selections[0] === item ? "light" : "secondary")} onClick={() => onClickButton(item, 0)} key={i}>{item}</Button>
                )})}
                </div>
                {rangeButtons[selections[0]].map((item, i) => { return (
                <div className="btn-group-spacing" key={i+1}>
                    <ButtonGroup size="sm">
                    {item.map((subitem, j) => { return (
                        <Button variant={(selections[i+1] === subitem ? "light" : "secondary")} disabled={!selections[i].length || ( i === 1 && selections[2] === "None") ? true : false} onClick={() => onClickButton(subitem, i+1)} key={j}>{subitem}</Button>
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
            <RangeChart selections={selections} onHoverEnter={onHoverEnter} onHoverExit={onHoverExit}/>
            <div class="frequency-display" style={freqFade ? {opacity: "25%"} : {}}>
                <span style={{color: "#EB967E"}}>{frequencies[0]}% Raise</span>
                <span> - </span>
                <span style={{color: "#8BBC8B"}}>{frequencies[1]}% Call</span>
                <span> - </span>
                <span style={{color: "#6CA3C1"}}>{frequencies[2]}% Fold</span>
                <span> - </span>
                <span>{frequencies[3]}% N/A</span>
            </div>
        </div>
    )
}

export default PreflopCharts;