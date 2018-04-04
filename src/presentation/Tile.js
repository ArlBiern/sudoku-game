import React, { Component } from 'react';

class Tile extends Component {
	handleChange (event) {
		if (event.target.value > 0 && event.target.value < 10 && event.target.value.length === 1) {
			this.props.updateBoard(event.target.value, event.target.id);
		}
	}

	selectText(event) {
 		event.target.select();
	}

	render() {
		let tileItem;
		if (this.props.blockTile === 'modify') {
			tileItem = <input 
				type='number' 
				min='1' 
				max='9'
				value={this.props.tile}
				onChange={this.handleChange.bind(this)}
				id={this.props.id}
				onClick={this.selectText.bind(this)}
				className={this.props.testSolution === 'wrong' ? 'bad-solution' : 'to-solve'}
				/>
		} else {
			tileItem = <input type='number' value={this.props.tile} readOnly className='blocked'/>
		}
		
		return (
			<div className='singleTile'>
				{tileItem}
			</div>
		)
	}
};

export default Tile;