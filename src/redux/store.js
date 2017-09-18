import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from "./reducers"

export default function configureStore( initialState ){

  const enhancer = compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )

  const store = createStore(reducers, 
                            initialState, 
                            enhancer
                          )
  return store;

}