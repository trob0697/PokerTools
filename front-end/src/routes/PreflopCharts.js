import React, { useEffect, useState } from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { deauthorize } from "../redux/user";
import { useHistory } from "react-router-dom";
import axios from "axios";

import RangeChart from "../components/preflopcharts/RangeChart";
import Dice from "../assets/dice.png";

function PreflopCharts(){
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const history = useHistory();
    
    const [charts, setCharts] = useState([]);
    const [curChartIndex, setCurChartIndex] = useState(0);
    const [selections, setSelections] = useState(["", "", "", ""]);
    const [randomizer, setRandomizer] = useState("--");
    const [frequencies, setFrequencies] = useState(["??", "??", "??", "??"]);
    const [freqFade, setFreqFade] = useState(true);

    useEffect(() => {
        axios.get("/api/preflop-charts/users-charts", 
                { headers: {"Authorization": "Bearer " + state.user.token} }
            )
            .then((res) => {
                res.data.forEach((item) => {
                    item.tabs = JSON.parse(item.tabs)
                })

                if(res.data.length){
                    setCharts(res.data)
                    setSelections([res.data[0].name, "", "", ""]);
                }
            })
            .catch((e) => {
                if(e.response.status === 401){
                    alert("Unauthorized");
                    dispatch(deauthorize());
                    history.push("/");
                }
            })
    });

    const changeChart = (val) => {
        let newChartIndex = curChartIndex + val;

        if(newChartIndex < 0 )
            newChartIndex = charts.length - 1;
        else if(newChartIndex >= charts.length)
            newChartIndex = 0;
        
        setCurChartIndex(newChartIndex);
        setSelections([charts[newChartIndex].name, "", "", ""])
    }

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
                <div className="header-btn-spacing">
                    <ButtonGroup size="m">
                        <Button variant="secondary" disabled={charts.length < 2}  onClick={() => changeChart(-1)}>{"<"}</Button>
                        <Button className="btn-inactive" variant="secondary" disabled={!charts.length}>{(charts.length ? charts[curChartIndex].name : "Add Charts In Settings")}</Button>
                        <Button variant="secondary" disabled={charts.length < 2} onClick={() => changeChart(1)}>{">"}</Button>
                    </ButtonGroup>
                </div>
                <div className="btn-group-spacing">
                    <ButtonGroup size="sm">
                    {charts.length ? 
                    charts[curChartIndex].tabs.map((item, i) => { return (
                        <Button key={i} variant={(selections[1] === item ? "light" : "secondary")} disabled={!selections[0].length} onClick={() => onClickButton(item, 1)}>{item}</Button>
                    )})
                    :
                    <Button variant="secondary" disabled>{"..."}</Button>
                    }
                    </ButtonGroup>
                </div>
                <div className="btn-group-spacing">
                    <ButtonGroup size="sm">
                    {["UTG", "HJ", "CO", "BTN", "SB", "BB"].map((item, i) => { return (
                        <Button key={i} variant={(selections[2] === item ? "light" : "secondary")} disabled={!selections[1].length || selections[2] === "None"} onClick={() => onClickButton(item, 2)}>{item}</Button>
                    )})}
                    </ButtonGroup>
                </div>
                <div className="btn-group-spacing">
                    <ButtonGroup size="sm">
                    {["UTG", "HJ", "CO", "BTN", "SB", "BB"].map((item, i) => { return (
                        <Button key={i} variant={(selections[3] === item ? "light" : "secondary")} disabled={!selections[2].length} onClick={() => onClickButton(item, 3)}>{item}</Button>
                    )})}
                    </ButtonGroup>
                </div>
                <div className="btn-group-spacing">
                    <ButtonGroup size="sm">
                        <Button variant="secondary" onClick={() => onClickRandomize()}><img src={Dice} alt="dice" height="17.5em"/></Button>
                        <Button className="btn-inactive" variant="secondary">{randomizer}</Button>
                    </ButtonGroup>
                </div>
            </div>
            <RangeChart selections={selections} onHoverEnter={onHoverEnter} onHoverExit={onHoverExit}/>
            <div className="frequency-display" style={freqFade ? {opacity: "25%"} : {}}>
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