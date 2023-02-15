import './App.css';
import { Table } from './table';
import Button from 'react-bootstrap/Button';
import React, {Component} from 'react';

class App extends Component {
  constructor(props){
    super(props);
    this.refresh = this.refresh.bind(this);
  }
  refresh(){
    window.location.reload(); /* more elegant solution required - no refresh of page, only components back to initial state */
  }
  
  render(){
    return (
    <div className="App">
      <h1>Connect 4!</h1>
      <Button variant='outline-dark' onClick={()=>this.refresh()}>Refresh</Button>
      <ul>
        <li><div>Try to get a pattern with 4 continuous circles having same color</div></li>
        <li><div>Grey - disabled</div></li>
        <li><div>White - allowed</div></li>
        <li><div>Red - Player 1 filled</div></li>
        <li><div>Blue - Player 2 filled</div></li>
        <li><div>Green - 4 Consecutive locations with same color</div></li>
      </ul>
      <Table numRows={6} numCols={6} />
    </div>
    )
  }
}

export default App;
