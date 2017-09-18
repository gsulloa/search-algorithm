import React, { Component } from 'react'
import styled from 'styled-components'
import Block from "./Block"

import { connect } from 'react-redux';

const Table = styled.table``
const TBody = styled.tbody``
const Tr = styled.tr``



const mapStateToProps = (state) => {
  return {
    table: state.board.table,
    selecting: state.selecting
  }
}
const mapDispatchToProps = (dispatch) => {return{
  
}}

class Board extends Component{
  render = () => {
    let j = 0, i;
    return(
      <Table>
        <TBody style={{border: "1px solid black"}}>
          {this.props.table.map(row =>{ 
              i = 0;
              j += 1;
              return(
                <Tr  style={{border: "1px solid black"}}>{row.map(col => 
                  <Block  j={j-1} i={i++} {...col} />  
                  )}
                </Tr>)
            }
          )}
        </TBody>
      </Table>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Board);