import { CONNECT } from "./types";

const initialState = {
  account: null,
}

export default function reducer(state = initialState, action){
  switch (action.type){
    case CONNECT:
      return state
    default:
      return state
  }
}