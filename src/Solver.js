import React, { Component } from 'react'
import _ from 'lodash';

import Board from "./Board"
import { WALL, SOLUTION, START } from "./constants"

class Solver extends Component{
  state = {
    table: new Array(10).fill(new Array(10).fill({status: false})),
    selecting: false
  }
  changeBlockTo = (newValue, pos) => {
    const {row, col} = pos;
    this.setState({
      table: [
        ...this.state.table.slice(0,row),
        [
          ...this.state.table[row].slice(0,col),
          newValue,
           ...this.state.table[row].slice(col+1)
          ],
        ...this.state.table.slice(row+1)
      ]
    })
  }
  handleClickBlock = async (pos) => {
    console.log("clicked:  ",pos);
    const { row, col } = pos;
    const block = this.state.table[row][col];
    let start_pos, solution_pos;
    switch(this.state.selecting){
      case START:
        start_pos = this.state.start;
        if(this.state.start){
          await this.changeBlockTo({...this.state.table[start_pos.row][start_pos.col], type: false}, start_pos)
          await this.setState({start: false})      
        }
        if(!this.state.start && !_.isEqual(pos,start_pos)){
          await this.setState({start: pos})
          await this.changeBlockTo({...block, type: START}, pos)          
        }
        return
      case SOLUTION:
        solution_pos = this.state.solution;
        if(this.state.solution){
          await this.changeBlockTo({...this.state.table[solution_pos.row][solution_pos.col], type: false}, solution_pos)
          await this.setState({solution: false})
        }
        if(!this.state.solution &&  !_.isEqual(pos, solution_pos)){
          await this.changeBlockTo({...block, type: SOLUTION}, pos)
          await this.setState({solution: pos})
        }
        return
      case WALL:
        if(block.type && block.type===WALL){
          this.changeBlockTo({...block, type: false}, pos)
        }else{
          this.changeBlockTo({...block, type: WALL}, pos)
        }
        return
      default:
        return;
    }
  }
  changeSelecting = (selecting) => {
    this.setState({selecting});
  }
  render = () => {
    return(
      <div>
        <Board table={this.state.table} clickBlock={this.handleClickBlock} />
        <div style={{display: "flex"}}>
          <button onClick={ () => this.changeSelecting(START)}>Seleccionar Inicio</button>
          <button onClick={ () => this.changeSelecting(SOLUTION)}>Seleccionar Destino</button>
          <button onClick={ () => this.changeSelecting(WALL)}>Seleccionar Paredes</button>
        </div>
      </div>
    )
  }
}

export default Solver;