import { ADD_MARKETS, ADD_MARKET, ADD_FILTERS } from "./types"

const initialState = {
  markets: [],
  filters: []
}

export default function reducer(state = initialState, action){
  switch (action.type){
  case ADD_MARKETS:
    return {
      ...state,
      markets: action.payload
    }
  case ADD_MARKET:
    return {
      ...state,
      markets: action.payload ? [
        ...state.markets.filter(m => m.id !== action.payload.id),
        action.payload
      ] : state.markets
    }
  case ADD_FILTERS:
    return {
      ...state,
      filters: action.payload
    }
  default:
    return state;
  }
}