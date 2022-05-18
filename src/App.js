import './App.css';
import { Component } from 'react';
import { Game } from './components/hangMan/hangmanGame';
import {word_list} from './components/hangMan/hangmanWords';
import { StartPage } from './components/startPage/startPage';
import {Routes,
Route} from 'react-router-dom'

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
        <Routes>
          {/* <Route path='/Game' element={<Game word={generateRandom()} />} /> */}
          <Route path='/' element={<StartPage/>} />
        </Routes>      
      </main>
    )
  }


}

export default App;
