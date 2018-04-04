import React, { Component } from 'react';
import Tile from './Tile';

class Board extends Component {
	handleChange(value, id) {
		this.props.updateBoard(value, id);
	}

	render() {
		let arrayBoard = this.props.tiles.split('');
		let testBoard = this.props.testSolution.split(',');
		let newTile;
		if (arrayBoard) {
			newTile = arrayBoard.map((tile,index) => {
				if (tile === '.') {
					tile = '';
				}
				return (
					<Tile key={index}
						 tile={tile}
						 id={index} 
						 updateBoard={this.handleChange.bind(this)}
						 blockTile={this.props.initialBoard[index] !== '.' ? "block" : "modify"}
						 testSolution={testBoard[index] === 'false' ? "wrong" : "good"}
					/>
				)}
			)
		}
		return (
			<div className='board'>
				{newTile}
			</div>
		)
		
	}
}

export default Board;