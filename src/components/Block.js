import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';

import { colors } from "../constants";
import { clickBlock } from "../redux/modules/board";

const Td = styled.td`
border: 1px solid black;
padding: 20px;
background: ${props => props.color ? props.color : ""};
`

const mapStateToProps = (state, ownProps) => {
  return {
    data: state.board.table[ownProps.j][ownProps.i],
    selecting: state.selecting,
    color: ownProps.type ? colors[ownProps.type] : (ownProps.status ? "black" : "white"),
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return{
  handleClick: (selecting, currentType) => dispatch(clickBlock(ownProps.j, ownProps.i, selecting, currentType))
}}

class Block extends Component{
  render = () => {
    return(
      <Td onClick={() => this.props.handleClick(this.props.selecting, this.props.data.type)} {...this.props}  />
    )

  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Block);