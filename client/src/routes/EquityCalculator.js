import React, { useState } from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import ECPlayerModal from "../components/ECPlayerModal";
import Board from "../components/Board";

export class Player{
    constructor(){
        this.handMatrix = Array.from(Array(4), () => Array(13).fill(false));
        this.rangeMatrix = Array.from(Array(13), () => Array(13).fill(false));
        this.val = "Empty...";
        this.equity = "??.??%";
    }
}

function EquityCalculator(){
    const [players, setPlayers] = useState([new Player(), new Player()]);
    const [currentPlayer, setCurrentPlayer] = useState(0);
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
        setCurrentPlayer(0);
    }

    const removePlayerAtIndex = (index) => {
        if(players.length > 2){
            const tempPlayers = [...players];
            tempPlayers.splice(index, 1);
            setPlayers(tempPlayers);
            setCurrentPlayer(0);
        }
    }

    const updatePlayer = (val) => {
        const tempPlayers = [...players];
        tempPlayers[currentPlayer].val = val;
        tempPlayers.forEach((p, i) => p.equity = "??.??%");
        setPlayers(tempPlayers);
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
            {players.map((player, i) => { return (
                <ButtonGroup className="player-bar" key={i}>
                    <Button className="player-bar-btn" variant="outline-danger" style={{borderTopLeftRadius: "0.25rem", borderBottomLeftRadius: "0.25rem"}} onClick={() => removePlayerAtIndex(i)}>&times;</Button>
                    <Button className="player-bar-btn" variant="secondary" onClick={() => {setCurrentPlayer(i); setShowHandModal(true);}}>Hand</Button>
                    <Button className="player-bar-btn" variant="secondary" onClick={() => {setCurrentPlayer(i); setShowRangeModal(true);}}>Range</Button>
                    <Button className="player-bar-range btn-inactive" variant="light">{player.val}</Button>
                    <Button className="player-bar-btn btn-inactive player-bar-calc-vals" variant="secondary" style={{minWidth: "fit-content"}}><div>Equity</div><div>{player.equity}</div></Button>
                </ButtonGroup>
            )})}
                <ECPlayerModal showHandModal={showHandModal} setShowHandModal={setShowHandModal} showRangeModal={showRangeModal} setShowRangeModal={setShowRangeModal} player={players[currentPlayer]} updatePlayer={(payload) => updatePlayer(payload)}/>
            </div>   

            <Board communityCards={communityCards} setCommunityCards={(payload) => setCommunityCards(payload)} /> 

            <Button variant="success" style={{margin: "1em"}}>Calculate</Button>
        </div>
    )
}

export default EquityCalculator;