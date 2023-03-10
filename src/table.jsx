import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import './table.css'

export class Cell extends Component{
	constructor(props){
		super(props);
		this.state = {
			fill : false,
			fillColor:this.props.turn
		}
		this.fill = this.fill.bind(this);
	}
	fill(e){
		if(this.props.allowed.some(x => x == this.props.cellNumber) && !this.state.fill){
			this.setState({
				fill: true,
				fillColor: this.props.turn == 'red' ? 'red' : 'blue'
			})
		  this.props.setTurn();
			this.props.allowed.push(this.props.cellNumber - 6);
			this.props.addFilled(this.props.cellNumber);
		}
	}
	render(){
		// console.log(`this cell is in allowed? ${this.props.allowed.some(x => x == this.props.cellNumber)} is filled? ${this.state.fill} with color ${this.state.fillColor}`)
		console.log(`${this.props.winningCircles.length > 0?  this.props.winningCircles:''}`);
		return (
			<td className={`${this.props.winningCircles.some(x => x == this.props.cellNumber) ? 'winning': this.props.allowed.some(x => x == this.props.cellNumber) ? (this.state.fill ? (this.state.fillColor == 'red'? 'red-fill' : 'blue-fill'): 'allowed') : ''}`} onClick={(e) => this.fill(e)}>
			</td>)
	}
}

export class Row extends Component{
	constructor(props){
		super(props);
		this.renderCols = this.renderCols.bind(this);
	}
	renderCols(numCols){
		// console.log(`allowed : ${this.props.allowed}`);
		let cols = [];
		for(let i = 0; i < numCols; i++){
			const cell = this.props.rowNumber * numCols + i;
			cols.push(
				(
					<Cell 
					key={cell} 
					turn={this.props.turn} 
					setTurn={this.props.setTurn}
					className={`${this.props.allowed.some(x => x == cell)  ? 'allowed' : ''}`}allowed={this.props.allowed}
					 addFilled={this.props.addFilled}
					 cellNumber={cell}
					 onClick={(e)=>this.fill(e)}
					 winningCircles={this.props.winningCircles}
					 />));
		}
		return cols;
	}
	render(){
		return (
			<tr key={this.props.rowNumber}>
				{this.renderCols(this.props.numCols)}
			</tr>)
	}
}

export class Table extends Component{
	constructor(props){
		super(props);
		this.state={
			filled:Array(props.numRows * props.numCols).fill(-1),
			allowed:Array.from(Array.from({ length: props.numCols }, (value, index) => index), arr => arr + (this.props.numRows - 1)*this.props.numCols),
			turn:'red',
			gameOver:false,
			winningCircles:[]
		}
		this.setTurn = this.setTurn.bind(this);
		this.addFilled = this.addFilled.bind(this);
		this.isGameOver = this.isGameOver.bind(this);
	}
	addFilled(cellNumber){
		let current = this.state.turn;
		let filled = this.state.filled;
		filled[cellNumber] = current;
		this.setState({
			filled: filled
		}, ()=>{
			this.setState({
				gameOver:this.isGameOver()
			})
		});
	}
	isGameOver(){
		return this.checkHorizontalCells() || this.checkVerticalCells() || this.checkLeftRightDiagonals() || this.checkRightLeftDiagonals();
	}
	// these 4 methods need to be more clean and easier to understand
	checkHorizontalCells(){
		
		let rows = this.props.numRows;
		let cols = this.props.numCols;
		for(let i = 0; i < rows; i++){
			for(let j = 0; j <= cols - 4; j ++){
				let compareArray =this.state.filled.filter((x, index) =>index == i*cols+j || 
						index == i*cols+ (j + 1) || 
						index == i*cols+ (j + 2) || 
						index == i*cols+ (j + 3));
				console.log(`compareHorizontalArray: ${compareArray}`)
				if (compareArray.every((x, index, arr) => ((x == 'red' || x == 'blue') && x == arr[0] && arr.length == 4))) {
					this.setState({
						winningCircles: compareArray
					});
					return true
				};
			}
		}
		return false;
	}
	checkLeftRightDiagonals(){
	let rows = this.props.numRows;
		let cols = this.props.numCols;
		for(let i = 0; i <= rows - 4; i++){
			for(let j = cols - 1; j >= cols - 4; j--){
				let compareArray =this.state.filled.filter((x, index) => index == i*cols+j || 
					index == (i+1)*cols+ (j-1) || 
					index == (i+2)*cols+ (j-2) || 
					index == (i+3)*cols+ (j-3));
				console.log(`compareHorizontalArray: ${compareArray}`)
				if (compareArray.every((x, index, arr) => ((x == 'red' || x == 'blue') && x == arr[0] && arr.length == 4))) {
					this.setState({
						winningCircles: compareArray
					})
					return true
				};
			}
		}
		return false;
	}
	checkRightLeftDiagonals(){
		let rows = this.props.numRows;
		let cols = this.props.numCols;
		for(let i = 0; i <= rows - 4; i++){
			for(let j = 0; j <= cols - 4; j ++){
				let compareArray =this.state.filled.filter((x, index) => index == i*cols+j || 
					index == (i+1)*cols+ (j+1) || 
					index == (i+2)*cols+ (j+2) || 
					index == (i+3)*cols+ (j+3));
				console.log(`compareHorizontalArray: ${compareArray}`)
				if (compareArray.every((x, index, arr) => ((x == 'red' || x == 'blue') && x == arr[0] && arr.length == 4))) {
					this.setState({
						winningCircles: compareArray
					})
					return true
				};
			}
		}
		return false;
	}
	checkVerticalCells(){
		console.log('checking vertical 4 in a row');
		let rows = this.props.numRows;
		let cols = this.props.numCols;
		for(let i = 0; i <= rows - 4; i++){
			for(let j = 0; j < cols; j ++){
				let compareArray =this.state.filled.filter((x, index) => index == i*cols+j || 
					index == (i+1)*cols+j || 
					index == (i+2)*cols+j || 
					index == (i+3)*cols+j );
				console.log(`compareVerticalArray : ${compareArray}`)
				if (compareArray.every((x, index, arr) => ((x == 'red' || x == 'blue') && x == arr[0] && arr.length == 4))) {
					this.setState({
						winningCircles: compareArray
					})
					return true
				};
			}
		}
		return false;
	}
	setTurn(){
		let current = this.state.turn;
		this.setState({
			turn: current == 'red' ? 'blue' : 'red'
		});
	}
	renderRows(numRows){
		const rows = [];
		for(let i = 0; i < numRows; i++){
			rows.push(
				<Row 
				key={i}
				turn={this.state.turn} 
				setTurn={this.setTurn} 
				allowed={this.state.allowed} 
				rowNumber={i} 
				numCols={this.props.numCols} 
				addFilled={this.addFilled}
				winningCircles={this.state.winningCircles}
				/>)
		}
		return rows;
	}
	render(){
		console.log(`allowed cells ${this.state.allowed}`)
		console.log(`filled cells ${this.state.filled}`)
		console.log(`turn : ${this.state.turn}`)
		return(
			<Container>
			  { this.state.gameOver && <h1>{`${(this.state.turn == 'red'? 'blue' : 'red').toUpperCase()} won. Game Over!`}</h1>}
				<div className={`background && ${this.state.gameOver && 'disabledDiv'}`}>
					<table>
						<tbody>
							{this.renderRows(this.props.numRows)}
						</tbody>
					</table>
				</div>
			</Container>
			)
	}
}