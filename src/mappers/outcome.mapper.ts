import { Outcome } from "../types/common.type";
import { MarketDTO } from './../types/common.type'

export class OutcomeMapper {
  static marketDTOtoOutcomesArray (market: MarketDTO): Outcome[] {
    let outcome1 = {
      name: market.outcome1Name,
      address: market.outcome1Address
    } as Outcome

    let outcome2 = {
      name: market.outcome2Name,
      address: market.outcome2Address
    } as Outcome
    return [outcome1, outcome2]
  }
}