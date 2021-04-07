import { fakeMarkets } from '../../api/mock.api';
import { ADD_MARKET, ADD_MARKETS_AND_FILTERS } from './types';

import axios from 'axios'
import { MarketMapper } from '../../mappers/market.mapper';
const _api = axios.create({
  baseURL: 'https://api.sheety.co/e045915699c6339af73ba9c1a52fccd8/betx'
})

export const fetchMarkets = () => async (dispatch, getState) => {
  let markets
  let filters
  try {
    let { data } = await _api.get('/markets')
    markets = MarketMapper.marketsDTOtoMarketsArray(data.markets)
    filters = markets.map(m => m.category)
  } catch (error) {
    markets = []
    filters = []
  }
  dispatch({
    type: ADD_MARKETS_AND_FILTERS,
    payload: {
      markets,
      filters: filters.filter((value, index) => filters.indexOf(value) === index)
    }
  })
}

export const fetchMarketById = (id) => async (dispatch, getState) => {
  let market
  try {
    let { data } = await _api.get(`/markets/${id}`)
    market = MarketMapper.marketDTOtoMarket(data.market)
  } catch (error) {
    market = null
  }
  dispatch({
    type: ADD_MARKET,
    payload: market
  })
}