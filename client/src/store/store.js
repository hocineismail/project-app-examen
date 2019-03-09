import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import userReducer from '../reducers/userReducer'

let reduxMiddlewareExtension = compose(
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const store = createStore(
  userReducer,
  reduxMiddlewareExtension  
)

export default store
