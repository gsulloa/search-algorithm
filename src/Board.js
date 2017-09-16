import React, { Component } from 'react'
import styled from 'styled-components'


const Table = styled.table``
const TBody = styled.tbody``
const Tr = styled.tr``
const Td = styled.td`
    border: 1px solid black;
    padding: 20px;
    background: ${props => props.color ? props.color : ""};
`

const colors= [
  "",
  "red",
  "green",
  "brown"
]

class Block extends Component{
  clickBlock = () => {
    const { j, i } = this.props;
    const pos = {row: j,col: i};
    this.props.clickBlock(pos);
  }
  render = () => {
    return(
      <Td onClick={this.clickBlock} {...this.props} />
    )
  }
}

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
                  <Block  color={ col.type ? colors[col.type] : (col.status ? "black" : "white")} 
                          j={j-1} i={i++} clickBlock={this.props.clickBlock} />  
                  )}
                </Tr>)
            }
          )}
        </TBody>
      </Table>
    )
  }
}

export default Board;