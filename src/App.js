import './App.css';
import { Component } from 'react';
import { Game } from './components/hangMan/hangmanGame';
import {word_list} from './components/hangMan/hangmanWords';

function generateRandom(){
  var index = Math.floor(Math.random() * word_list.length);
  return word_list[index];
}


class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      wordList : word_list
    }
  }

  render(){
    return(
      <main>
        <Game word={generateRandom()} />
      </main>
    )
  }


}

export default App;
