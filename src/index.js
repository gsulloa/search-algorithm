import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import configureStore from "./redux/store"


const table = new Array(10).fill(new Array(10).fill({status: false}))

const initialState = {board: {
  table
}}

const store = configureStore(initialState);

ReactDOM.render(<App store={store} />, document.getElementById('root'));
