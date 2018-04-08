import React, { Component } from 'react';
import './App.css';
import Board from '../presentation/Board.js';
import sudoku from 'sudoku-umd';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialBoard: '',
      gameBoard: '',
      testSolution: ''
    }
  }

  static defaultProps = {
    level: ['easy', 'medium', 'hard', 'very-hard', 'insane', 'inhuman']
  }

  handleNewGame() {
    let level = this.refs.levelRef.value;
    const newSudoku = sudoku.generate(level);
    this.setState({
      initialBoard: newSudoku,
      gameBoard: newSudoku,
      testSolution: ''
    });
  }

  handleChange(value, id) {
    const actualSudoku = this.state.gameBoard.split('');
    const arrChangeSudoku = actualSudoku.splice(id, 1, value);
    const updateSudoku = actualSudoku.join('');
    this.setState({
      gameBoard: updateSudoku,
      testSolution: ''
    })
  }
  
  handleRestart() {
    const restartGame = this.state.initialBoard;
    this.setState({
      gameBoard: restartGame,
      testSolution: ''
    })
  }
  
  handleCheck() {
    const actualSudoku = this.state.gameBoard.split('');
    const solution = sudoku.solve(this.state.initialBoard).split('');
    const compareArray = actualSudoku.slice().map((item, index) => {
      if (item === ".") {
        return "N-S";
      } else {
        return item === solution[index];
      }
    })

    if (this.state.initialBoard === this.state.gameBoard) {
      alert('Spróbuj najpierw coś wpisać ;)')
    } else if (compareArray.indexOf(false) !== -1) {
      alert("Masz bład w conajmniej jednym z rozwiązań");
    } else if (compareArray.indexOf('N-S') !== -1) {
      alert("Jesteś na dobrej drodze ;)");
    } else {
      alert("Brawo! Rozwiązałeś SUDOKU :)")
    }
  }

  handleHint() {
    const actualSudoku = this.state.gameBoard.split('');
    const solution = sudoku.solve(this.state.initialBoard).split('');
    const compareArray = actualSudoku.slice().map((item, index) => {
      if (item === ".") {
        return "N-S";
      } else {
        return item === solution[index];
      }
    })
    this.setState({
      testSolution: compareArray.join(',')
    })
  }

  handleSolve() {
    const solution = sudoku.solve(this.state.initialBoard);
    this.setState({
      gameBoard: solution,
    })
  }

  render() {
    let level = this.props.level.map(level => {
      return <option key={level} value={level}>{level}</option>
    })
    return (
      <div className="App">
         <h1>Try yourself in SUDOKU game</h1>
         <Board 
            tiles={this.state.gameBoard} 
            initialBoard={this.state.initialBoard}
            testSolution={this.state.testSolution} 
            updateBoard={this.handleChange.bind(this)}
          />
         <div className="buttons">
            <div className="level">
              <p>Set level:</p>
              <select ref="levelRef">
                {level}
              </select>
              <input type="submit" value="Start Game" onClick={this.handleNewGame.bind(this)}/>
            </div>
            <button onClick={this.handleCheck.bind(this)}>Check</button>
            <button onClick={this.handleSolve.bind(this)}>Solve</button>
            <button onClick={this.handleRestart.bind(this)}>Restart</button>
            <button onClick={this.handleHint.bind(this)}>Hint</button>
         </div>
      </div>
    );
  }
}

export default App;
