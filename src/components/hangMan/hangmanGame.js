import React, {Component} from 'react';
import {stages} from "./hangmanStages";

const letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

class Game extends Component{

    constructor(props){
        super(props);
        
        this.state = {
            currWord : props.word,
            currLevel : 1
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleGuess = this.handleGuess.bind(this);
    }

    renderButtons(){
        return letters.map((item) => (
            <button >{item}</button>
        ));
    }

    // renderLevel(){
    //     const keys = Object.keys(stages)
    //     return keys.map((number) => 
    //         (stages[number].map((row) =>
    //             <p>{row}</p>))
    //     );
    // }
    renderLevel(level){
        return stages[level].map((row) =>
                <p>{row}</p>);
    }

    renderWord(word){
        return word.split('').map((letter)=>
                ' _ ')
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

    handleGuess(e){
        e.preventDefault();
        if (this.state.currWord.includes(this.state.value)){
            alert(this.state.value + " is in the word!")
        }
        else{
            alert(this.state.value + " is not in the word!")
        }
    }


    render(){
        return (
            <div className='GameBox'>
                <div className='Box1'>
                    <h1>Current word is {this.state.currWord}</h1>
                    
                </div>
                <div className='Box2'>
                    {this.renderLevel(this.state.currLevel)} 
                    {this.renderWord(this.state.currWord)}
                </div>
                <div className='Box2'>
                    {this.renderButtons()}   
                </div>  
                <div>      
                <h2>Guess a letter</h2>
                    <form onSubmit={this.handleGuess} className='Box2'>
                        <input type="text" value={this.state.value} onChange={this.handleChange}/>
                        <input type="submit" value="Submit"/>
                    </form>  
                </div>   
            </div>
        );
    }
}

export {Game}