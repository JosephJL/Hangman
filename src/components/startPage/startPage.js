import { useState } from 'react'
import {
    Link
} from 'react-router-dom'
import { Game } from '../hangMan/hangmanGame'

function StartPage () {
    const [start,setStart] = useState(false);
    const [word,setWord] = useState('');

    const submit = (e) => {
        e.preventDefault();
        if (word.length === 0){
            setStart(false);
            alert('You left it blank!')
        } else{
            setStart(true);
        }
    }

    if (start) {
        return (
            <Game word={word.toLowerCase()} />
        );
    } else{
        return (
            <div>
                <h1>Player One set your word</h1>
                <form onSubmit={submit}>
                    <input placeholder='Type word here' value={word} onChange={(e) => setWord(e.target.value)} />
                    <button type='submit'>Lets Play!</button>
                </form>
            </div>
        )
    }

}

export {StartPage}