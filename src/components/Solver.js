import React, { Component } from 'react';
import { connect } from 'react-redux';
import {SELECT_SOLUTION, SELECT_START, SELECT_WALL} from "../constants";

import { changeSelecting } from "../redux/modules/selecting"

import Board from "./Board"


const mapStateToProps = () => { return {}}
const mapDispatchToProps = (dispatch) => {return {
  changeSelecting: (select) => dispatch(changeSelecting(select))
}}

class Solver extends Component{
  state = {
    table: new Array(10).fill(new Array(10).fill({status: false})),
    selecting: false
  }
  render = () => {
    return(
      <div>
        <Board clickBlock={this.handleClickBlock} />
        <div style={{display: "flex"}}>
          <button onClick={ () => this.props.changeSelecting(SELECT_START)}>Seleccionar Inicio</button>
          <button onClick={ () => this.props.changeSelecting(SELECT_SOLUTION)}>Seleccionar Destino</button>
          <button onClick={ () => this.props.changeSelecting(SELECT_WALL)}>Seleccionar Paredes</button>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Solver);