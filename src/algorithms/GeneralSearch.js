import _ from 'lodash';
import { WALL, SOLUTION, START, OPEN, CLOSED, PATH } from "../constants"
import { changeBlock } from "../redux/modules/board"
/*
S: Complete state of the board
A: List of possible actions, with format [{rowDif, colDif}]
s: Initial Block
g: Solution Block
join: function to join our lists
*/
const TIME = 100;

/*
TODO: fix no solution problem
*/
export function timedGeneralSearch(S,A,s,g,join){
  return (dispatch)=>{
    let u, v, succ, next;
    let closed = [];
    let open = [s];
    s.parent = null;
    dispatch(changeBlock(s.pos.row,s.pos.col, OPEN))
    const whileOpen = setInterval( () => {
      u = open.shift()
      closed.push(u)
      dispatch(changeBlock(u.pos.row,u.pos.col, CLOSED))
      succ = getSuccessors(S,A,u)
      next = _.filter(succ, (element) => !_.some(open.concat(closed),element))
      for(let i in next){
        v = next[i];
        v.parent = u;
        dispatch(changeBlock(v.pos.row,v.pos.col, OPEN))
        if(_.isEqual(v,g)){
          let sol = v;
          while(sol.parent != null){
            dispatch(changeBlock(sol.pos.row, sol.pos.col, PATH))
            sol = sol.parent;
            if(sol.parent === null){
              setTimeout(() =>{
                dispatch(changeBlock(s.pos.row, s.pos.col, START))
                dispatch(changeBlock(g.pos.row, g.pos.col, SOLUTION))
              }, TIME)
            }
          }
          dispatch(changeBlock(sol.pos.row, sol.pos.col, PATH))
          clearInterval(whileOpen)
        }
      }
      open = join(next,open)
      if(open === []){
        clearInterval(whileOpen)
      }
    }, TIME)
  }
}



export default function generalSearch(S,A,s,g, join){
  return async (dispatch) => {
    alert("Start");
    await setTimeout(() => {alert("After interval")}, 10000);
    //console.log("State: ", S)
    let u, v, succ, next;
    let closed = [];
    //console.log("closed: ", closed)
    let open = [s];
    await dispatch(changeBlock(s.pos.row,s.pos.col, OPEN))
    //console.log("open: ", open)
    s.parent = null;
    while(open.length !== 0){
      //Getting first element of Open
      u = open.shift();
      //console.log("review element: ", u)
      //Setting closed the element
      closed.push(u)
      dispatch(changeBlock(u.pos.row,u.pos.col, CLOSED))
      //console.log("pushing to closed")
      //Getting successors of our element
      succ = getSuccessors(S,A,u)
      //console.log("successors of element: ", succ)
      //Getting posible next elements (without open and closed)

      next = _.filter(succ, (element) => !_.some(open.concat(closed),element))
      //console.log("next elements: ", next)
      for(let i in next){
        v = next[i];
        v.parent = u;
        if(_.isEqual(v,g)){
          //console.log("found !", v)
          let sol = v;
          while(sol.parent != null){
            dispatch(changeBlock(sol.pos.row, sol.pos.col, PATH))
            sol = sol.parent;
          }
          dispatch(changeBlock(sol.pos.row, sol.pos.col, PATH))
          return v
        }
        await setTimeout(dispatch(changeBlock(v.pos.row,v.pos.col, OPEN)),1000)
      }
      open = join(next,open)
      //console.log("new open: ", open)
      //console.log("current closed: ", closed)
    }
  }
}

function getSuccessors(S,A,u){
  //console.log("getting successors")
  const successors = [];
  let successor;
  A.forEach((action) => {
    //console.log("Action: ", action)
    if(u.pos.row + action.rowDif >= 0 && u.pos.row + action.rowDif < S.length &&
       u.pos.col + action.colDif >= 0 && S[u.pos.row] && u.pos.col + action.colDif < S[u.pos.row].length){
          successor = S[u.pos.row + action.rowDif][u.pos.col + action.colDif];
          if(successor.type !== WALL){
            successors.push(successor);
            //console.log(successor);
          }
    }
  })
  return successors

}
