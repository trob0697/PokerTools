import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import axios from "axios";

function RangeChart(props){
    const [range, setRange] = useState(Array.from(Array(13), () => Array(13).fill([0, 0, 0])));

    useEffect(() => {
        if(props.selections[3].length){
            axios.post("/api/preflopcharts/data", {
                    game: props.selections[0].replace(/[\s+-]/g, ""),
                    scenario: props.selections[1].replace(/[\s+-]/g, ""),
                    villain: props.selections[2].replace(/[\s+-]/g, ""),
                    hero: props.selections[3].replace(/[\s+-]/g, "") + "r"
                })
                .then((res) => {
                    setRange(res.data);
                })
        }
        else{
            setRange(Array.from(Array(13), () => Array(13).fill([0, 0, 0])));
        }
    }, [props.selections]);

    const hands = [
        ["AA", "AKs", "AQs", "AJs", "ATs", "A9s", "A8s", "A7s", "A6s", "A5s", "A4s", "A3s", "A2s"],
        ["AKo", "KK", "KQs", "KJs", "KTs", "K9s", "K8s", "K7s", "K6s", "K5s", "K4s", "K3s", "K2s"], 
        ["AQo", "KQo", "QQ", "QJs", "QTs", "Q9s", "Q8s", "Q7s", "Q6s", "Q5s", "Q4s", "Q3s", "Q2s"], 
        ["AJo", "KJo", "QJo", "JJ", "JTs", "J9s", "J8s", "J7s", "J6s", "J5s", "J4s", "J3s", "J2s"], 
        ["ATo", "KTo", "QTo", "JTo", "TT", "T9s", "T8s", "T7s", "T6s", "T5s", "T4s", "T3s", "T2s"], 
        ["A9o", "K9o", "Q9o", "J9o", "T9o", "99", "98s", "97s", "96s", "95s", "94s", "93s", "92s"], 
        ["A8o", "K8o", "Q8o", "J8o", "T8o", "98o", "88", "87s", "86s", "85s", "84s", "83s", "82s"], 
        ["A7o", "K7o", "Q7o", "J7o", "T7o", "97o", "87o", "77", "76s", "75s", "74s", "73s", "72s"], 
        ["A6o", "K6o", "Q6o", "J6o", "T6o", "96o", "86o", "76o", "66", "65s", "64s", "63s", "62s"], 
        ["A5o", "K5o", "Q5o", "J5o", "T5o", "95o", "85o", "75o", "65s", "55", "54s", "53s", "52s"], 
        ["A4o", "K4o", "Q4o", "J4o", "T4o", "94o", "84o", "74o", "64o", "54o", "44", "43s", "42s"], 
        ["A3o", "K3o", "Q3o", "J3o", "T3o", "93o", "83o", "73o", "63o", "53o", "43o", "33", "32s"], 
        ["A2o", "K2o", "Q2o", "J2o", "T2o", "92o", "82o", "72o", "62o", "52o", "42o", "32o", "22"]
    ];
    
    const getDisplay = (i, j) => {
        if(range[i][j][0] === 0 && range[i][j][1] === 0 && range[i][j][2] === 0){
            if(i < j)
                return "#AAAAAA";
            else if(i === j)
                return "#F8F9FA";
            else
                return "#3D3D3D";
        }
        else{
            let stringBuilder = "linear-gradient(to right";
            let total = 0;
            
            if(range[i][j][0] !== 0){
                total += range[i][j][0];
                stringBuilder += ", #EB967E " + (total - range[i][j][0]).toString() + "%, #EB967E " + total.toString() + "%";
            }
            if(range[i][j][1] !== 0){
                total += range[i][j][1];
                stringBuilder += ", #8BBC8B " + (total - range[i][j][1]).toString() + "%, #8BBC8B " + total.toString() + "%";
            }
            if(range[i][j][2] !== 0){
                total += range[i][j][2];
                stringBuilder += ", #6CA3C1 " + (total - range[i][j][2]).toString() + "%, #6CA3C1 " + total.toString() + "%";
            }
        
            if(i === j)
                stringBuilder += ", #F8F9FA " + (total).toString() + "%)";
            else if(i < j)
                stringBuilder += ", #AAAAAA " + (total).toString() + "%, #AAAAAA)";
            else
                stringBuilder += ", #3D3D3D " + (total).toString() + "%, #3D3D3D)";
        
            return stringBuilder;
        }
    }

    return(
        <Container className="range-chart-container">
        {hands.map((item, i) => { return (
            <Row className="justify-content-center" xs="auto" key={i}>
            {item.map((subitem, j) => { return (
                <div className="square" style={{background: getDisplay(i, j)}} key={j}>{subitem}</div>
            )})}
            </Row>
        )})}
        </Container>
    )
}

export default RangeChart;