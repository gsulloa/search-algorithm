import board from "./modules/board";
import selecting from "./modules/selecting"
import { combineReducers } from 'redux'

export default combineReducers({
  board,
  selecting
})