import React, {Component} from 'react';
import { useNavigate, Route} from 'react-router-dom';
import {stages} from "./hangmanStages";
import { word_list } from './hangmanWords';

const letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

class Game extends Component{

    constructor(props){
        super(props);
        
        this.state = {
            currWord : props.word,
            currLevel : 1,
            status : 6,
            guessedWrong : "",
            guess: "",
            end:'',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleGuess = this.handleGuess.bind(this);
        this.increaseLevel = this.increaseLevel.bind(this);
        this.renderButton = this.renderButton.bind(this);
        // initialize guess with _
        for (let i = 0; i < this.state.currWord.length; i++) {
            this.state.guess += "_";
        }
    }

    refreshPage(){
        window.location.reload(false)
    }

    renderButton(letter){
            
        if (this.state.guess.includes(letter)) {
            return (<button className='correct' disabled onClick={(e) => this.handleGuess(e,letter)}>
                {letter}
                </button>);
            }
        else if (this.state.guessedWrong.includes(letter)) {
            return (<button className='wrong' disabled onClick={(e) => this.handleGuess(e,letter)}>
                {letter}
                </button>);
            }
        return (<button onClick={(e) => this.handleGuess(e,letter)}>
        {letter}
        </button>);
        
    }

    renderLevel(level){
        return stages[level].map((row) =>
                <p>{row}</p>);
    }

    renderResult(result){
        if(result === 'win'){
            return(
                <h2>You win!</h2>
            )
        }else{
            return(
                <h2>You Lose!</h2>
            )
        }
    }

    increaseLevel(e){
        return this.setState({
            currWord: this.state.currWord,
            currLevel: this.state.currLevel + 1
        })
    }

    handleChange(e){
        this.setState({value: e.target.value 
        });
    }

    handleGuess(e,value){
        e.preventDefault();
        console.log('value is',value)
        if (this.state.currWord.includes(value)){

            //update guess var
            for (let i = 0; i < this.state.currWord.length; i++) {
                if (this.state.currWord.charAt(i) == value) {
                    var chars = this.state.guess.split('');
                    chars[i] = value;
                    this.state.guess = chars.join('');
                }
            }

            this.setState({guessedCorrect : this.state.guessedCorrect + value})
            // console.log(this.state.guessedCorrect)
        }
        else{
            // alert(this.state.value + " is not in the word!")
            this.setState(
                {
                    guessedWrong : this.state.guessedWrong + value,
                    currLevel : this.state.currLevel + 1,
                    status : this.state.status - 1
                }
            )
            console.log(this.state.guessedWrong)
        }

        if (this.state.currWord === this.state.guess){
            this.setState({
                end:'win',
            })
        }
        else if (this.state.status === 1){
            this.setState({
                end:'lose',
            })
        }
    }

    render(){
        if (this.state.end === ''){
            return (
                <div className='container'>
                    <div className='box1'>
                        <h1>Save Bob</h1>
                        {this.renderLevel(this.state.currLevel)} 
                    </div>
                    <div className='box2'>
                        <h2> You have {this.state.status} tries left </h2>
                        <p> {
                            this.state.guess.split('').join(' ')
                        } </p>
                    </div>
                    <div className='box3'>
                    <h2>Guess a letter</h2>
                        {letters.map(this.renderButton)}   
                    </div>  
                </div>
            );
        }
        else {
            return (
                <div className='container'>
                    <div className='box1'>
                        <h1>Save Bob</h1>
                        {this.renderLevel(this.state.currLevel)} 
                    </div>
                    <div className='box2'>
                        {this.renderResult(this.state.end)}
                        <p> {
                            this.state.guess.split('').join(' ')
                        } </p>
                        <button onClick={() => this.refreshPage()}>Play Again</button>
                    </div>
                    <div className='box3'>
                    <h2>Guess a letter</h2>
                        {letters.map(this.renderButton)}   
                    </div>  
                </div>
            );
        }
    }
}

export {Game}