import React, {Component} from 'react';
import { useNavigate, Route} from 'react-router-dom';
import Popup from './popup';
import image0 from '../images/0.png';
import image1 from '../images/1.png';
import image2 from '../images/2.png';
import image3 from '../images/3.png';
import image4 from '../images/4.png';
import image5 from '../images/5.png';
import image6 from '../images/6.png';

const letters = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

class Game extends Component{

    static defaultProps = {
        images: [image0,image1,image2,image3,image4,image5,image6]
    }

    constructor(props){
        super(props);
        
        this.state = {
            currWord : props.word,
            currLevel : 0,
            status : 6,
            guessedWrong : "",
            guess: "",
            currSetter: props.currentSetter,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleGuess = this.handleGuess.bind(this);
        // this.increaseLevel = this.increaseLevel.bind(this);
        this.renderButton = this.renderButton.bind(this);
        this.onTrigger = this.onTrigger.bind(this);
        // initialize guess with _
        for (let i = 0; i < this.state.currWord.length; i++) {
            this.state.guess += "_";
        }
    }

    onTrigger(status){
        if (this.state.currWord == this.state.guess){
            this.props.parentCallback(true);
        }else{
            this.props.parentCallback(false);
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

    // increaseLevel(e){
    //     return this.setState({
    //         currWord: this.state.currWord,
    //         currLevel: this.state.currLevel + 1
    //     })
    // }

    handleChange(e){
        this.setState({value: e.target.value 
        });
    }

    handleGuess(e,value){
        e.preventDefault();
        console.log('value is',value)
        console.log('currGuess is',this.state.guess)
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
    }

    render(){
        if (this.state.guess != this.state.currWord && this.state.status > 0){
            return (
                <div className='gamePage'>
                    <div className='box1'>
                    <h1>SAVE HALLOWEEN</h1>
                        <img src={this.props.images[this.state.currLevel]}/> 
                    </div>
                    <div className='box2'>
                        <h2> You have {this.state.status} lives left </h2>
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
                <div className='gamePage'>
                    <div className='box1'>
                        <h1>SAVE HALLOWEEN</h1>
                        <img src={this.props.images[this.state.currLevel]}/> 
                    </div>
                    <div className='box2'>
                        <p> {
                            this.state.guess.split('').join(' ')
                        } </p>
                    </div>
                    <div className='box3'>
                    <h2>Guess a letter</h2>
                        {letters.map(this.renderButton)}   
                    </div>
                    <div>
                        <Popup trigger={this.state.guess == this.state.currWord}>
                            <h1 className='congrats'>"Congrats! You managed to save halloween"</h1>
                            <h1>You get a point!</h1>
                            <button className='close-btn' onClick={this.onTrigger}>Next Round</button>
                        </Popup>
                        <Popup trigger={this.state.guess != this.state.currWord}>
                            <h2>The word is <h2 className='currword'>"{this.state.currWord}"</h2></h2>
                            <h1 className='gameover'>~You lost Halloween!~</h1>
                            <h1>Point goes to {this.state.currSetter}</h1>
                            {/* <h1 className='gameover'>~You lost Halloween! Better luck next time!~</h1> */}
                            <button className='close-btn' onClick={this.onTrigger}>Next Round</button>
                        </Popup> 
                    </div>  
                </div>
            );
        }
    }
}

export {Game}