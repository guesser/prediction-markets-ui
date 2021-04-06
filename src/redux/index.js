import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'

import markets from './markets'
const reducers = combineReducers({
  markets
})

export default createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk)),
)