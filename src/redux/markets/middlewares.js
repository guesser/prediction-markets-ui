import { fakeMarkets, filters } from '../../api/mock.api';
import { ADD_MARKETS, ADD_MARKET, ADD_FILTERS } from './types';


export const fetchMarkets = () => async (dispatch, getState) => {
  let markets = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(fakeMarkets)
    }, 1000)
  })
  dispatch({
    type: ADD_MARKETS,
    payload: markets
  })
}

export const fetchMarketById = (id) => async (dispatch, getState) => {
  let markets = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(fakeMarkets.find(m => m.id === parseInt(id)))
    }, 1000)
  })
  dispatch({
    type: ADD_MARKET,
    payload: markets
  })
}

export const fetchFilters = () => async (dispatch, getState) => {
  let types = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(filters)
    }, 1000)
  })
  dispatch({
    type: ADD_FILTERS,
    payload: types
  })
}