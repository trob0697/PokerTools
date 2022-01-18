import React, { useEffect, useState } from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import axios from "axios";
import ECPlayerModal from "../components/ECPlayerModal";
import Board from "../components/Board";

export class Player{
    constructor(){
        this.handMatrix = Array.from(Array(4), () => Array(13).fill(false));
        this.rangeMatrix = Array.from(Array(13), () => Array(13).fill(false));
        this.val = "Empty...";
        this.equity = "??.?%";
    }
}

function EquityCalculator(){
    const [players, setPlayers] = useState([new Player(), new Player()]);
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [showHandModal, setShowHandModal] = useState(false);
    const [showRangeModal, setShowRangeModal] = useState(false);
    const [communityCards, setCommunityCards] = useState([]);
    const [isCalcEnabled, setIsCalcEnabled] = useState(false);

    useEffect(() => {
        let enabled = true;
        if(communityCards.length > 0 && communityCards.length < 3)
            enabled = false;

        let dealtCards = new Set();
        communityCards.forEach((card) => { dealtCards.add(card) })

        players.forEach((player) => {
            if(player.val === "Empty..." || dealtCards.has(player.val.substring(0, 2)) || dealtCards.has(player.val.substring(2)))
                enabled = false;
            else{
                dealtCards.add(player.val.substring(0, 2));
                dealtCards.add(player.val.substring(2));
            }
        })

        setIsCalcEnabled(enabled);
    }, [players, communityCards]);

    const addPlayer = () => {
        if(players.length < 6){
            const tempPlayers = [...players];
            tempPlayers.push(new Player());

            tempPlayers.forEach((p) => p.equity = "??.?%");
            setPlayers(tempPlayers);
        }
    }

    const removePlayer = () => {
        if(players.length > 2){
            const tempPlayers = [...players];
            tempPlayers.pop();

            tempPlayers.forEach((p) => p.equity = "??.?%");
            setPlayers(tempPlayers);
            setCurrentPlayer(0);
        }
    }

    const removePlayerAtIndex = (index) => {
        if(players.length > 2){
            const tempPlayers = [...players];
            tempPlayers.splice(index, 1);

            tempPlayers.forEach((p) => p.equity = "??.?%");
            setPlayers(tempPlayers);
            setCurrentPlayer(0);
        }
    }

    const updatePlayer = (val) => {
        const tempPlayers = [...players];
        tempPlayers[currentPlayer].val = val;
        tempPlayers.forEach((p) => p.equity = "??.?%");
        setPlayers(tempPlayers);
    }

    const updateCommunityCards = (val) => {
        const tempPlayers = [...players];
        tempPlayers.forEach((p) => p.equity = "??.?%");
        setPlayers(tempPlayers);
        setCommunityCards(val);
    }

    const calculateEquity = () => {
        let players_cards = [];
        
        players.forEach((player) => {
            let temp_cards = [];
            temp_cards.push(player.val.substring(0, 2), player.val.substring(2));
            players_cards.push(temp_cards);
        })

        axios.get("/api/equitycalculator/calculate/", {
            headers: {'Authorization': 'Bearer ' + sessionStorage.getItem("access_token")},
            params: {
                players: JSON.stringify(players_cards),
                board: JSON.stringify(communityCards)
            }
        })
        .then((res) => {
            let equities = res.data.slice(1);
            const tempPlayers = [...players];
            tempPlayers.forEach((p, i) => {
                if(equities[i] === 1)
                    p.equity = "100%";
                else
                    p.equity =  (equities[i]*100).toFixed(1).toString() + "%";
            });
            setPlayers(tempPlayers);
        })
    }

    return(
        <div className="eq-calc-container">
            <div>
                <ButtonGroup style={{margin: "1em"}}>
                    <Button variant="secondary" disabled={players.length <= 2} onClick={() => removePlayer()}>-</Button>
                    <Button className="btn-inactive" variant="secondary">{players.length} Players</Button>
                    <Button variant="secondary" disabled={players.length >= 6} onClick={() => addPlayer()}>+</Button>
                </ButtonGroup>
            </div>

            <div style={{margin: "1em"}}>
            {players.map((player, i) => { return (
                <ButtonGroup className="player-bar" key={i}>
                    <Button className="player-bar-btn" variant="outline-danger" style={{borderTopLeftRadius: "0.25rem", borderBottomLeftRadius: "0.25rem"}} onClick={() => removePlayerAtIndex(i)}>&times;</Button>
                    <Button className="player-bar-btn" variant="secondary" onClick={() => {setCurrentPlayer(i); setShowHandModal(true);}}>Hand</Button>
                    <Button className="player-bar-btn" variant="secondary" onClick={() => {setCurrentPlayer(i); setShowRangeModal(true);}} disabled >Range</Button>
                    <Button className="player-bar-range btn-inactive" variant="light">{player.val}</Button>
                    <Button className="player-bar-btn btn-inactive player-bar-calc-vals" variant="secondary"><div>Equity</div><div>{player.equity}</div></Button>
                </ButtonGroup>
            )})}
                <ECPlayerModal showHandModal={showHandModal} setShowHandModal={setShowHandModal} showRangeModal={showRangeModal} setShowRangeModal={setShowRangeModal} player={players[currentPlayer]} updatePlayer={(payload) => updatePlayer(payload)}/>
            </div>   

            <Board communityCards={communityCards} updateCommunityCards={(payload) => updateCommunityCards(payload)} /> 

            <Button disabled={!isCalcEnabled} variant="success" style={{margin: "1em"}} onClick={() => calculateEquity()}>Calculate</Button>
        </div>
    )
}

export default EquityCalculator;