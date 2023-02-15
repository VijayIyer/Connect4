import React, { Component } from 'react';
import './table.css'

export class Cell extends Component{
	render(){
		return (
			<td onClick={this.props.onClick}>
			</td>)
	}
}

export class Row extends Component{
	constructor(props){
		super(props);
		this.state = {
			turn : 'red'
		}
	}
	fill(e){
		this.state.turn == 'red' ? e.target.classList.add('red-fill') : e.target.classList.add('blue-fill');
		this.setState({
			turn: this.state.turn == 'red'? 'blue' : 'red'
		});
	}

	renderCols(numCols){
		let cols = [];
		for(let i = 0; i < numCols; i++){
			cols.push((<Cell cellNumber={i} onClick={(e)=>this.fill(e)} />));
		}
		return cols;
	}
	render(){
		return (
			<tr key={this.props.rowNumber} className={`${this.props.rowNumber === 0 ? 'allowed' : ''}`}>
				{this.renderCols(6)}
			</tr>)
	}
}

export class Table extends Component{
	constructor(props){
		super(props);
		this.state={
			filled:
		}
	}
	
	
	renderRow(rowNumber){
		return (<Row rowNumber={rowNumber} />);	
	}

	renderRows(numRows){
		const rows = [];
		for(let i = 0; i < numRows; i++){
			rows.push(this.renderRow(i))
		}
		return rows;
	}
	render(){
		return(
			<table>
				<tbody>
				{this.renderRows(6)}
				</tbody>
			</table>
			)
	}
}