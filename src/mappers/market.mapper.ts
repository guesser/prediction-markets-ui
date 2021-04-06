import { Market } from "../types/common.type";
import { OutcomeMapper } from "./outcome.mapper";
import { MarketDTO } from './../types/common.type'
export class MarketMapper {
  static marketsDTOtoMarketsArray (markets: MarketDTO[]): Market[] {
    return markets.map(m => this.marketDTOtoMarket(m))
  }

  static marketDTOtoMarket (market: MarketDTO): Market {
    return {
      title: market.title,
      id: market.id,
      type: market.type,
      category: market.category,
      address: market.marketAddress,
      outcomes: OutcomeMapper.marketDTOtoOutcomesArray(market)
    } as Market
  }
}