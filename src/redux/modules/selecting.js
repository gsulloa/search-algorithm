import { SELECT_SOLUTION,SELECT_START ,SELECT_WALL } from "../../constants";
import { WALL, SOLUTION, START } from "../../constants";
export default function selecting( state = false, action){
  switch(action.type){
    case SELECT_WALL:
      return WALL
    case SELECT_START:
      return START
    case SELECT_SOLUTION:
      return SOLUTION
    default:
      return state
  }
}

export function changeSelecting(select){
  return({
    type: select
  })
}