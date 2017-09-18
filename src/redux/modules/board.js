import { CHANGE_TYPE } from "../../constants";
import { WALL, SOLUTION, START,
         SELECTING_SOLUTION, SELECTING_START,
         DESELECTING_SOLUTION, DESELECTING_START,
         CLEAR_BOARD
        } from "../../constants";
export default function board(state = {table: [[]]}, action){
  switch(action.type){
    case CHANGE_TYPE:
      const { newType, row, col } = action;
      return{
        ...state,
        table: [
          ...state.table.slice(0,row),
          [
            ...state.table[row].slice(0,col),
            {...state.table[row][col], type: newType},
            ...state.table[row].slice(col+1)
            ],
          ...state.table.slice(row+1)
        ]
      }
    case SELECTING_START:
      if(state.start){
        const {row, col} = state.start;
        return { ...state, 
                 start: action.pos, 
                 table: [
                  ...state.table.slice(0,row),
                  [
                    ...state.table[row].slice(0,col),
                    {...state.table[row][col], type: false},
                    ...state.table[row].slice(col+1)
                    ],
                  ...state.table.slice(row+1)
                ]}        
      }
      return { ...state, start: action.pos}
    case SELECTING_SOLUTION:
      if(state.solution){
        const {row, col} = state.solution;
        return { ...state, 
                 solution: action.pos, 
                 table: [
                  ...state.table.slice(0,row),
                  [
                    ...state.table[row].slice(0,col),
                    {...state.table[row][col], type: false},
                    ...state.table[row].slice(col+1)
                    ],
                  ...state.table.slice(row+1)
                ]}        
      }
      return { ...state, solution: action.pos}
    case DESELECTING_START:
      return { ...state, start: undefined}
    case DESELECTING_SOLUTION:
      return { ...state, solution: undefined}
    case CLEAR_BOARD:
      console.log("clearing board")
      const table = new Array(state.table.length);
      for(let j = 0; j < table.length; j++){
        table[j] = new Array(state.table[0].length);
        for(let i = 0; i < table[j].length; i++){
          table[j][i] = {
            pos: {
              col: i,
              row: j
            }
          }   
        }
      }
      return { table }
    default:
      return state;
  }
}


export function clickBlock(row, col, selecting, currentType){  
  return (dispatch) => {
    switch(selecting){
      case START:
        if(currentType === START){
          dispatch(deselect(START))
          dispatch(changeBlock(row,col,false))
        }else{
          dispatch(select(START, {row,col}))
          dispatch(changeBlock(row,col,START))
        }
        return
      case SOLUTION:
        if(currentType === SOLUTION){
          dispatch(deselect(SOLUTION))
          dispatch(changeBlock(row,col,false))
        }else{
          dispatch(select(SOLUTION,{row,col}))
          dispatch(changeBlock(row,col,SOLUTION))
        }
        return
      case WALL:
        if(currentType === WALL){
          dispatch(changeBlock(row,col,false))
        }else{
          dispatch(changeBlock(row,col,WALL))
        }
        return
      default:
        return;
    }
  }
}

export function changeBlock(row, col, newType){
  return({
    type: CHANGE_TYPE,
    row, col, newType
  })
}
function deselect(type){
  switch(type){
    case START:
      return { type: DESELECTING_START }
    case SOLUTION:
      return { type: DESELECTING_SOLUTION }
    default:
      return
  }
}
function select(type, pos){
  switch(type){
    case START:
      return { type: SELECTING_START, pos }
    case SOLUTION:
      return { type: SELECTING_SOLUTION, pos }
    default:
      return
  }
}

export function refresh(table,start,solution){
  return async (dispatch) => {
    let i,j;
    for(j = 0; j < table.length; j++){
      for(i = 0; i < table[j].length; i++){
        if(table[j][i].type !== WALL){
          await dispatch(changeBlock(j,i,false))
        }
      }
    }
    await dispatch(changeBlock(start.row,start.col,START))
    await dispatch(changeBlock(solution.row, solution.col, SOLUTION))
  }
}
export function clearBoard(){
  return {
    type: CLEAR_BOARD
  }
}