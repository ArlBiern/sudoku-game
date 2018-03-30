import React, { Component } from 'react';
import './App.css'
import Board from '../presentation/Board.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.State = {
      initialBoard: '',
      gameBoard: ''
    }
  }
  

  render() {
    return (
      <div className="App">
         <h1>Try yourself in SUDOKU game</h1>
         <Board />
         <div className="buttons">
            <button>New Game</button>
            <button>Check</button>
            <button>Solve</button>
            <button>Restart</button>
         </div>
      </div>

    );
  }
}

export default App;
