import React, { useState, useEffect } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
const prange = require("prange")

function HandModal(props){
    const [handMatrix, setHandMatrix] = useState(Array.from(Array(4), () => Array(13).fill(false)));
    const [cardCount, setCardCount] = useState(0);

    useEffect( () => {
        setHandMatrix(props.player.handMatrix);

        let counter = 0;
        handMatrix.forEach((row, i) => {
            row.forEach((col, j) => {
                if(col)
                    counter += 1;
            })
        })
        setCardCount(counter);
    }, [handMatrix, props.player])

    const cards = [
        ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"],
        ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"],
        ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"],
        ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"]
    ];

    const onClickCard = (i, j) => {
        const tempHandMatrix = [...handMatrix];

        if(handMatrix[i][j]){
            tempHandMatrix[i][j] = false;
            setCardCount(cardCount - 1);
        }
        else if(!handMatrix[i][j] && cardCount < 2){
            tempHandMatrix[i][j] = true;
            setCardCount(cardCount + 1);
        }
        
        setHandMatrix(tempHandMatrix);
    }

    const onSubmitHand = () => {
        let val = ""
        for(let i = 0; i < 13; i++){
            for(let j = 0; j < 4; j++){
                if(handMatrix[j][i]){
                    let cardVal = cards[j][i];
                    if(j === 0)
                        cardVal += "s";
                    else if(j === 1)
                        cardVal += "h";
                    else if(j === 2)
                        cardVal += "c";
                    else if(j === 3)
                        cardVal += "d";
                    
                    val += cardVal;
                }
            }
        }

        props.updatePlayer(val);
        props.setShowHandModal(false);
    }

    return(
        <Modal centered show={props.showHandModal} onHide={() => props.setShowHandModal(false)}>
            <Modal.Header >
                <Modal.Title>Player Hand Selector</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {cards.map((item, i) => { return (
                <Row className="flex-nowrap" key={i}>
                {item.map((subitem, j) => { return (
                    <Col className={"board-modal-card " + (i % 2 ? "red" : "black")} onClick={() => onClickCard(i, j)} style={handMatrix[i][j] ? {backgroundColor: "yellow"} : {}} key={j}>
                        <div>{subitem}</div>
                        {(() => {
                            switch(i){
                                case 0:
                                    return <i className="bi-suit-spade-fill"></i>;
                                case 1:
                                    return <i className="bi-suit-heart-fill"></i>;
                                case 2:
                                    return <i className="bi-suit-club-fill"></i>;
                                case 3:
                                    return <i className="bi-suit-diamond-fill"></i>;
                                default:
                                    return <i/>;
                            }
                        })()}
                    </Col>
                )})}
                </Row>
            )})}
            </Modal.Body>
            <Modal.Footer>
                <Button disabled={cardCount < 2} onClick={() => onSubmitHand()}>Submit</Button>
            </Modal.Footer>
        </Modal>
    )
}

function RangeModal(props){
    const [range, setRange] = useState(Array.from(Array(13), () => Array(13).fill(false)));

    useEffect( () => {
        setRange(props.player.rangeMatrix)
    }, [props.player])

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
        if(range[i][j])
            return "yellow";
        else if(i < j)
            return "#AAAAAA";
        else if(i === j)
            return "#F8F9FA";
        else
            return "#3D3D3D";
    }

    const onClickChart = (i, j) => {
            const tempRange = [...range];
            tempRange[i][j] = !tempRange[i][j];
            setRange(tempRange);
    }

    const onMouseOverChart = (event, i, j) => {
        if(event.buttons){
            const tempRange = [...range];
            tempRange[i][j] = !tempRange[i][j];
            setRange(tempRange);
        }
    }

    const onSubmitRange = () => {
        let val = [];

        range.forEach((row, i) => {
            row.forEach((col, j) => {
                if(col)
                    val.push(hands[i][j]);
            })
        })
        
        if(val.length)
            props.updatePlayer(prange.reverse(val));
        else
            props.updatePlayer("Empty...");
        props.setShowRangeModal(false);
    }

    return(
        <Modal centered size="lg" show={props.showRangeModal} onHide={() => props.setShowRangeModal(false)}>
            <Modal.Header>
                <Modal.Title>Player Range Selector</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container className="range-chart-container" style={{width: "fit-content", paddingTop: "1px", backgroundColor: "black"}}>
                {hands.map((item, i) => { return (
                    <Row key={i} className="justify-content-center" xs="auto" style={{width: "fit-content"}}>
                    {item.map((subitem, j) => { return (
                        <div key={j} className="square player-range-modal-square" style={{background: getDisplay(i, j), textAlign: "center"}} onMouseDown={() => onClickChart(i, j)} onMouseOver={(event) => onMouseOverChart(event, i, j)}>{subitem}</div>
                    )})}
                    </Row>
                )})}
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => onSubmitRange()}>Submit</Button>
            </Modal.Footer>
        </Modal>
    )
}

function ECPlayerModal(props){
    return(
        <div>
            <HandModal showHandModal={props.showHandModal} setShowHandModal={props.setShowHandModal} player={props.player} updatePlayer={props.updatePlayer}/>
            <RangeModal showRangeModal={props.showRangeModal} setShowRangeModal={props.setShowRangeModal} player={props.player} updatePlayer={props.updatePlayer}/>
        </div>
    )
}

export default ECPlayerModal;