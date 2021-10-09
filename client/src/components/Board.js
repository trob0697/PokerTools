import React, { useState } from "react";
import { Row, Col, Modal, Button } from "react-bootstrap";

function Board(props){
    const [show, setShow] = useState(false);
    const [cardsSelector, setCardsSelector] = useState(Array.from(Array(4), () => Array(13).fill(false)));
    const [cardsSelected, setCardsSelected] = useState([]);

    const cards = [
        ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"],
        ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"],
        ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"],
        ["A", "K", "Q", "J", "T", "9", "8", "7", "6", "5", "4", "3", "2"]
    ];

    const renderCard = (index) => {
        if(index < props.communityCards.length)
            return "./deck/" + props.communityCards[index] + ".png";
        else
            return "./deck/z_cardback.png";
    }

    const onModalOpen = () => {
        setCardsSelector(Array.from(Array(4), () => Array(13).fill(false)));
        setCardsSelected([]);
        setShow(true);
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
        else if(!cardsSelector[i][j] && cardsSelected.length < 5){
            newCardsSelector[i][j] = true;
            newCardsSelected.push(cardVal);
        }
        
        setCardsSelector(newCardsSelector);
        setCardsSelected(newCardsSelected);
    }

    const onSubmitSelectedCards = () => {
        props.setCommunityCards(cardsSelected);
        setShow(false);
    }

    return(
        <div>
            <div className="row board" onClick={() => onModalOpen()}>
                <img className="board-playing-card" alt="card" src={renderCard(0)}/>
                <img className="board-playing-card" alt="card" src={renderCard(1)}/>
                <img className="board-playing-card" alt="card" src={renderCard(2)}/>
                <img className="board-playing-card" alt="card" src={renderCard(3)}/>
                <img className="board-playing-card" alt="card" src={renderCard(4)}/>
            </div>

            <Modal centered show={show} onHide={() => setShow(false)}>
                <Modal.Header >
                    <Modal.Title>Community Cards Card Selector</Modal.Title>
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
                    <Button onClick={() => onSubmitSelectedCards()}>Submit</Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default Board;