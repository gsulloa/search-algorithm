import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import configureStore from "./redux/store"

const table = new Array(10);
for(let j = 0; j < table.length; j++){
  table[j] = new Array(10);
  for(let i = 0; i < table[j].length; i++){
    table[j][i] = {
      pos: {
        col: i,
        row: j
      }
    }   
  }
}

const initialState = {board: {
  table
}}

const store = configureStore(initialState);

ReactDOM.render(<App store={store} />, document.getElementById('root'));
