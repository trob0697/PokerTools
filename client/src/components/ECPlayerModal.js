import React, { useState } from "react";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";

function HandModal(props){
    const [cardsSelector, setCardsSelector] = useState(Array.from(Array(4), () => Array(13).fill(false)));
    const [cardsSelected, setCardsSelected] = useState([]);

    const cards = [
        ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"],
        ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"],
        ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"],
        ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"]
    ];

    const onOpen = () => {
        setCardsSelector(Array.from(Array(4), () => Array(13).fill(false)));
        setCardsSelected([]);
        props.setShowHandModal(false)
    }

    const onClickCard = (i, j) => {
        const newCardsSelector = [...cardsSelector];
        const newCardsSelected = [...cardsSelected];

        let cardVal = cards[i][j];
        if(i === 0)
            cardVal += "s";
        else if(i === 1)
            cardVal += "h";
        else if(i === 2)
            cardVal += "c";
        else if(i === 3)
            cardVal += "d";

        if(cardsSelector[i][j]){
            newCardsSelector[i][j] = false;
            newCardsSelected.splice(newCardsSelected.indexOf(cardVal, 0), 1);
        }
        else if(!cardsSelector[i][j] && cardsSelected.length < 2){
            newCardsSelector[i][j] = true;
            newCardsSelected.push(cardVal);
        }
        
        setCardsSelector(newCardsSelector);
        setCardsSelected(newCardsSelected);
    }


    return(
        <Modal centered show={props.showHandModal} onHide={() => onOpen()}>
            <Modal.Header >
                <Modal.Title>Hand Selector</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {cards.map((item, i) => { return (
                <Row className="flex-nowrap" key={i}>
                {item.map((subitem, j) => { return (
                    <Col className={"board-modal-card " + (i % 2 ? "red" : "black")} onClick={() => onClickCard(i, j)} style={cardsSelector[i][j] ? {backgroundColor: "yellow"} : {}} key={j}>
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
                <Button >Submit</Button>
            </Modal.Footer>
        </Modal>
    )
}

function RangeModal(props){
    const [range, setRange] = useState(Array.from(Array(13), () => Array(13).fill(false)))

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

    return(
        <Modal centered size="lg" show={props.showRangeModal} onHide={() => props.setShowRangeModal(false)}>
            <Modal.Header>
                <Modal.Title>Range Selector</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container className="range-chart-container" >
                {hands.map((item, index) => { return (
                    <Row className="justify-content-center" xs="auto" key={index} >
                    {item.map((subitem, subindex) => { return (
                        <div style={{padding: 0.1, backgroundColor: "black"}}>
                            <div className="square" style={{background: getDisplay(index, subindex)}} key={subindex}>{subitem}</div>
                        </div>
                    )})}
                    </Row>
                )})}
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button >Submit</Button>
            </Modal.Footer>
        </Modal>
    )
}

function ECPlayerModal(props){
    return(
        <div>
            <HandModal showHandModal={props.showHandModal} setShowHandModal={props.setShowHandModal} />
            <RangeModal showRangeModal={props.showRangeModal} setShowRangeModal={props.setShowRangeModal} />
        </div>
    )
}

export default ECPlayerModal;