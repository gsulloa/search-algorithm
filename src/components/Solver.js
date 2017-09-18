import React, { Component } from 'react';
import { connect } from 'react-redux';
import {SELECT_SOLUTION, SELECT_START, SELECT_WALL} from "../constants";

import { changeSelecting } from "../redux/modules/selecting"
import { refresh } from "../redux/modules/board"

import DFS from "../algorithms/DFS"
import BFS from "../algorithms/BFS"

import Board from "./Board"


const mapStateToProps = (state) => { return {
  ...state.board
}}
const mapDispatchToProps = (dispatch) => {return {
  changeSelecting: (select) => dispatch(changeSelecting(select)),
  DFS: (S,A,s,g) => dispatch(DFS(S,A,s,g)),
  BFS: (S,A,s,g) => dispatch(BFS(S,A,s,g)),
  refresh: (table,start,solution) => dispatch(refresh(table, start,solution))
}}

class Solver extends Component{
  render = () => {
    return(
      <div>
        <Board clickBlock={this.handleClickBlock} />
        <div style={{display: "flex"}}>
          <button onClick={ () => this.props.changeSelecting(SELECT_START)}>Seleccionar Inicio</button>
          <button onClick={ () => this.props.changeSelecting(SELECT_SOLUTION)}>Seleccionar Destino</button>
          <button onClick={ () => this.props.changeSelecting(SELECT_WALL)}>Seleccionar Paredes</button>
        </div>
        <div>
          <button onClick={ () => this.props.DFS(this.props.table,
                                      [
                                        {rowDif:-1,colDif:0},
                                        {rowDif:0,colDif:1},
                                        {rowDif:1,colDif:0},
                                        {rowDif:0,colDif:-1}
                                      ],
                                      this.props.table[this.props.start.row][this.props.start.col],
                                      this.props.table[this.props.solution.row][this.props.solution.col])}>DFS</button>
          <button onClick={ () => this.props.BFS(this.props.table,
                                      [
                                        {rowDif:-1,colDif:0},
                                        {rowDif:0,colDif:1},
                                        {rowDif:1,colDif:0},
                                        {rowDif:0,colDif:-1}
                                      ],
                                      this.props.table[this.props.start.row][this.props.start.col],
                                      this.props.table[this.props.solution.row][this.props.solution.col])}>BFS</button>                                      
        </div>
        <div>
          <button onClick={ () => this.props.refresh(this.props.table, this.props.start, this.props.solution)}>Refresh</button>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Solver);