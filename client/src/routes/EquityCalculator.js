import React, { useState } from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import ECPlayerModal from "../components/ECPlayerModal";
import Board from "../components/Board";

export class Player{
    constructor(){
        this.hand = []
        this.range = []
        this.val = "Empty..."
        this.win = "??.??%"
        this.tie = "??.??%"
    }
}

function EquityCalculator(){
    const [players, setPlayers] = useState([new Player(), new Player()]);
    const [currentPlayer, setCurrentPlayer] = useState(-1);
    const [showHandModal, setShowHandModal] = useState(false);
    const [showRangeModal, setShowRangeModal] = useState(false);
    const [communityCards, setCommunityCards] = useState([]);

    const addPlayer = () => {
        const tempPlayers = [...players];
        tempPlayers.push(new Player());
        setPlayers(tempPlayers);
    }

    const removePlayer = () => {
        const tempPlayers = [...players];
        tempPlayers.pop();
        setPlayers(tempPlayers);
    }

    const removePlayerAtIndex = (index) => {
        if(players.length > 2){
            const tempPlayers = [...players];
            tempPlayers.splice(index, 1);
            setPlayers(tempPlayers);
        }
    }

    return(
        <div className="eq-calc-container">
            <div>
                <ButtonGroup style={{margin: "1em"}}>
                    <Button variant="secondary" disabled={players.length <= 2} onClick={() => removePlayer()}>-</Button>
                    <Button className="btn-inactive" variant="secondary">{players.length} Players</Button>
                    <Button variant="secondary" disabled={players.length >= 9} onClick={() => addPlayer()}>+</Button>
                </ButtonGroup>
            </div>

            <div style={{margin: "1em"}}>
            {players.map((player, index) => { return (
                <ButtonGroup className="player-bar" key={index}>
                    <Button className="player-bar-btn" variant="outline-danger" style={{borderTopLeftRadius: "0.25rem", borderBottomLeftRadius: "0.25rem"}} onClick={() => removePlayerAtIndex(index)}>&times;</Button>
                    <Button className="player-bar-btn" variant="secondary" onClick={() => {setCurrentPlayer(index); setShowHandModal(true);}}>Hand</Button>
                    <Button className="player-bar-btn" variant="secondary" onClick={() => {setCurrentPlayer(index); setShowRangeModal(true);}}>Range</Button>
                    <Button className="player-bar-range btn-inactive" variant="light">{player.val}</Button>
                    <Button className="player-bar-btn btn-inactive player-bar-calc-vals" variant="secondary"><div>Win</div><div>{player.win}</div></Button>
                    <Button className="player-bar-btn btn-inactive player-bar-calc-vals" variant="secondary"><div>Tie</div><div>{player.tie}</div></Button>
                </ButtonGroup>
            )})}
                <ECPlayerModal showHandModal={showHandModal} setShowHandModal={setShowHandModal} showRangeModal={showRangeModal} setShowRangeModal={setShowRangeModal} />
            </div>   

            <Board communityCards={communityCards} setCommunityCards={(payload) => setCommunityCards(payload)} /> 

            <Button variant="success" style={{margin: "1em"}}>Calculate</Button>
        </div>
    )
}

export default EquityCalculator;