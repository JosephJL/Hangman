import { useState } from 'react'
import {
    Link
} from 'react-router-dom'
import { Game } from '../hangMan/hangmanGame'
import Popup from '../hangMan/popup';

function StartPage () {
    const [start,setStart] = useState(false);
    const [word,setWord] = useState('');
    const [playerOne,setPlayerOne] = useState('');
    const [playerTwo,setPlayerTwo] = useState('');
    const [nameStatus,setNameStatus] = useState(false);
    const [playerOneScore,setPlayerOneScore] = useState(0);
    const [playerTwoScore,setPlayerTwoScore] = useState(0);
    // const [currentSetter,setCurrentSetter] = useState('');
    const [isPlayerOneTurn,setCurrentSetter] = useState(true);

    const handleCallback = (result) => {
        if (isPlayerOneTurn){
            if (result){
                setPlayerTwoScore(playerTwoScore + 1);
            } else {
                setPlayerOneScore(playerOneScore + 1);
            }
            // setCurrentSetter(playerTwo);
        } else {
            if (result){
                setPlayerOneScore(playerOneScore + 1);
            } else{
                setPlayerTwoScore(playerTwoScore + 1);
            }
            // setCurrentSetter(playerOne);
        }
        setWord("");
        setCurrentSetter(!isPlayerOneTurn);
        setStart(false);
    }

    const submit = (e) => {
        e.preventDefault();
        if (word.length === 0){
            setStart(false);
            alert('You left it blank!');
        }
        else if (hasNumber(word)){
            alert('Your word should only contain letters!');
        }
        else{
            setStart(true);
        }
    }

    const hasNumber = (myString) => {
        return /\d/.test(myString);
    }

    const updateNames = (e) => {
        e.preventDefault();
        if (playerOne.length === 0 || playerTwo.length === 0){
            setNameStatus(false);
            alert("Where is your name!");
        }
        else if (playerOne === playerTwo){
            alert("Both names cannot be the same!");
        }
        else {
            // setCurrentSetter(playerOne)
            setNameStatus(true);
        }
    }

    if (start) {
        if (isPlayerOneTurn){
            return (
                <Game parentCallback ={handleCallback} word={word.toLowerCase()} currentSetter={playerOne} currentPlayer={playerTwo}/>
            )
        }else{
            return (
                // <Game parentCallback ={handleCallback} currentSetter={currentSetter} word={word.toLowerCase()}/>
                <Game parentCallback ={handleCallback} word={word.toLowerCase()} currentSetter={playerTwo} currentPlayer={playerOne}/>
                );
        }
    }
    else if (nameStatus == false) {
        return(
            <div className='startPage'>
                <h1>Challenge your friend</h1>
                <form className='nameForm' onSubmit={updateNames}>
                        <input className ='nameInput' placeholder='Player 1 Name' value={playerOne} onChange={(e) => setPlayerOne(e.target.value)} />
                        <input className ='nameInput' placeholder='Player 2 Name' value={playerTwo} onChange={(e) => setPlayerTwo(e.target.value)} />
                        <button className='startButton' type='submit'>
                            <span className='play_text'>Let's Play</span>
                            <span className='play_icon'><ion-icon name="walk-outline"></ion-icon></span>
                        </button>
                </form>
            </div>
        )
    }
    else if (playerOneScore == 3 || playerTwoScore == 3){
        return (
            <div>
                <Popup trigger={playerOneScore == 3}>
                    <h2>Game over! {playerOne} WINS!</h2>
                    <button className='close-btn' onClick={() => window.location.reload(false)}>Play Again?</button>
                </Popup>
                <Popup trigger={playerTwoScore == 3}>
                    <h2>Game over! {playerTwo} WINS!</h2>
                    {/* <h1 className='gameover'>~You lost Halloween! Better luck next time!~</h1> */}
                    <button className='close-btn' onClick={() => window.location.reload(false)}>Play Again?</button>
                </Popup> 
            </div> 
        )
    }
    else{
        return (
            <div className='scorePage'>
                <h1>Current Scoreboard</h1>
                <h2>{playerOne} score: {playerOneScore}</h2>
                <h2>{playerTwo} score: {playerTwoScore}</h2>
                <h1>{isPlayerOneTurn ? playerOne : playerTwo} set your word</h1>
                <form className='startForm' onSubmit={submit}>
                    <input placeholder='Type word here' value={word} onChange={(e) => setWord(e.target.value)} />
                    <button className='startButton' type='submit'>
                        <span className='play_text'>Let's Play</span>
                            <span className='play_icon'><ion-icon name="walk-outline"></ion-icon></span>
                    </button>
                </form>
            </div>
        )
    }

}

export {StartPage}