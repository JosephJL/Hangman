import React, {Component} from 'react';
import Popup from "./popup";
// import {stages} from "./hangmanStages";
import image0 from "../images/0.png";
import image1 from "../images/1.png";
import image2 from "../images/2.png";
import image3 from "../images/3.png";
import image4 from "../images/4.png";
import image5 from "../images/5.png";
import image6 from "../images/6.png";


const letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

class Game extends Component{

    static defaultProps = {
        images: [image0, image1, image2, image3, image4, image5, image6]
    }

    constructor(props){
        super(props);
        
        this.state = {
            currWord : props.word,
            currLevel : 0,
            status : 6,
            guessedCorrect : "",
            guessedWrong : ""            
        }
        // this.handleChange = this.handleChange.bind(this);
        this.handleGuess = this.handleGuess.bind(this);
        // this.increaseLevel = this.increaseLevel.bind(this);
        this.renderButton = this.renderButton.bind(this);
        this.renderWord = this.renderWord.bind(this);
        // this.reset = this.reset.bind(this);
    }

    // reset() {
    //     this.setState({
    //         status: 6,
    //         currLevel: 0,
    //         guessedCorrect: "",
    //         guessedWrong: "",
    //         //currWord: props.word ?? to get the word
    //     })  
    // }

    // renderButtons(){
    //     return letters.map((item) => (
    //         <button onClick={(e) => this.handleGuess(e,item)}>{item}</button>
    //     ));
    // }

    renderButton(letter){
            
        if (this.state.guessedCorrect.includes(letter)) {
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

    // renderLevel(){
    //     const keys = Object.keys(stages)
    //     return keys.map((number) => 
    //         (stages[number].map((row) =>
    //             <p>{row}</p>))
    //     );
    // }
    // renderLevel(level){
    //     return stages[level];
    // }

    renderWord(){
        return this.state.currWord
        .split("")
        .map((letter) => (this.state.guessedCorrect.includes(letter) ? letter : " _ "));

        // if (this.state.guessedCorrect.includes(letter)) {
        //     return letter;
        //     }
        // return' _ ';
    }

    // increaseLevel(e){
    //     return this.setState({
    //         // currWord: this.state.currWord,
    //         currLevel: this.state.currLevel + 1
    //     })
    // }

    // handleChange(e){
    //     this.setState({value: e.target.value 
    //     });
    // }

    handleGuess(e,value){
        this.setState({value: e.target.value 
        })
        e.preventDefault();
        // console.log('value is',value)

        // if (this.state.currWord === this.state.guessedCorrect + value){
        //     alert("You got it right!");
        //     window.location.reload(false);
        // }

        // if (this.state.status === 1){
        //     alert("Bob is dead");
        //     window.location.reload(false);
        // }


        if (this.state.currWord.includes(value)){
            // alert(this.state.value + " is in the word!")
            this.setState({guessedCorrect : this.state.guessedCorrect + value})
            console.log(this.state.guessedCorrect)
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
    }

    render(){

        // let gameState = "";

        // // not sure why it pops up twice :<

        // if (this.state.currWord == this.renderWord().join(""))
        // { 
        //     gameState = "Congrats! You managed to save halloween"
        //     // alert("Congrats! You managed to save halloween");
        //     // window.location.reload(false);
        //     // popups = "Congrats! You managed to save halloween"
        // }

        // if (this.state.status === 1)
        // {
        //     gameState = "Halloween is gone! Better luck next time!";
        //     // alert("Halloween is gone! Better luck next time!");
        //     // window.location.reload(false);
        //     // popups = "Halloween is gone, Better luck next time"
        //     // "The word is {this.state.currWord}"
        // }

        return (
            <div className='GameBox'>
                <div className='Box1'>
                    <h1 className='title'>SAVE HALLOWEEN</h1>
                </div>
                <div className='Box2'>
                    <img src={this.props.images[this.state.currLevel]} height='400px' />
                    <h3> You have <span>{this.state.status}</span> tries left </h3>
                    <h1 className='wordguess'>{(this.renderWord())}</h1>
                </div>
                <div className='Box2'>
                <h2>Guess a letter</h2>
                    {letters.map(this.renderButton)}   
                </div>  
                <div> result -
                {this.state.currWord} word 
                {this.renderWord()}
                </div>
                <div>
                    <Popup trigger={this.state.currWord == this.renderWord().join("")}>
                        <h1 className='congrats'>"Congrats! You managed to save halloween"</h1>
                    </Popup>
                    <Popup trigger={this.state.status === 1}>
                        <h3>The word is <span className='currword'>{this.state.currWord}</span></h3>
                        <h1 className='gameover'>"You lost Halloween! Better luck next time!"</h1>
                    </Popup>
                </div>
            </div>
           
            
        );
    }
}

export {Game}