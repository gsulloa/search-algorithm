import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, ButtonGroup } from 'react-bootstrap';
import {SELECT_SOLUTION, SELECT_START, SELECT_WALL} from "../constants";

import { changeSelecting } from "../redux/modules/selecting"
import { refresh, clearBoard } from "../redux/modules/board"

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
  refresh: (table,start,solution) => dispatch(refresh(table, start,solution)),
  clear: () => dispatch(clearBoard())
}}

class Solver extends Component{
  render = () => {
    return(
      <div style={{width: "100%", height: "100%", display: "flex", position: "absolute"}}>
        <div style={{flex: "1 0 auto",display:"flex", flexFlow:"column nowrap", alignItems: "center", justifyContent: "space-around"}}>
          <Board clickBlock={this.handleClickBlock} />
          <ButtonGroup>
            <Button bsStyle="danger" onClick={ () => this.props.changeSelecting(SELECT_START)}>Seleccionar Inicio</Button>
            <Button bsStyle="success" onClick={ () => this.props.changeSelecting(SELECT_SOLUTION)}>Seleccionar Destino</Button>
            <Button onClick={ () => this.props.changeSelecting(SELECT_WALL)}>Seleccionar Paredes</Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button onClick={ () => this.props.DFS(this.props.table,
                                        [
                                          {rowDif:-1,colDif:0},
                                          {rowDif:0,colDif:1},
                                          {rowDif:1,colDif:0},
                                          {rowDif:0,colDif:-1}
                                        ],
                                        this.props.table[this.props.start.row][this.props.start.col],
                                        this.props.table[this.props.solution.row][this.props.solution.col])}>DFS</Button>
            <Button onClick={ () => this.props.BFS(this.props.table,
                                        [
                                          {rowDif:-1,colDif:0},
                                          {rowDif:0,colDif:1},
                                          {rowDif:1,colDif:0},
                                          {rowDif:0,colDif:-1}
                                        ],
                                        this.props.table[this.props.start.row][this.props.start.col],
                                        this.props.table[this.props.solution.row][this.props.solution.col])}>BFS</Button>                                      
          </ButtonGroup>
          <ButtonGroup>
            <Button bsStyle="warning" onClick={ () => this.props.refresh(this.props.table, this.props.start, this.props.solution)}>Refresh</Button>
            <Button bsStyle="danger" onClick={ () => this.props.clear()}>Clear</Button>
          </ButtonGroup>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Solver);