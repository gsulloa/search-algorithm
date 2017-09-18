/*
BOARD REDUCER
*/

export const CHANGE_TYPE = "CHANGE_TYPE";

export const SELECTING_START = "SELECTING_START";
export const SELECTING_SOLUTION = "SELECTING_SOLUTION";
export const DESELECTING_START = "DESELECTING_START";
export const DESELECTING_SOLUTION = "DESELECTING_SOLUTION";

/*
SELECTING REDUCER
*/
export const SELECT_START = "SELECT_START";
export const SELECT_SOLUTION = "SELECT_SOLUTION";
export const SELECT_WALL = "SELECT_WALL";

/*
BLOCK TYPES
*/
export const START = 1;
export const SOLUTION = 2;
export const WALL = 3;
export const OPEN = 4;
export const CLOSED = 5;
export const PATH = 6;

/*
BLOCK COLORS
*/
export const colors= [
  "",
  "red",
  "green",
  "brown",
  "pink",
  "blue",
  "yellow"
]