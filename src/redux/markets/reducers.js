import { ADD_MARKETS_AND_FILTERS, ADD_MARKET } from "./types"

const initialState = {
  markets: [],
  filters: []
}

export default function reducer(state = initialState, action){
  switch (action.type){
  case ADD_MARKETS_AND_FILTERS:
    return {
      ...state,
      markets: action.payload.markets,
      filters: action.payload.filters
    }
  case ADD_MARKET:
    return {
      ...state,
      markets: action.payload ? [
        ...state.markets.filter(m => m.id !== action.payload.id),
        action.payload
      ] : state.markets
    }
  default:
    return state;
  }
}