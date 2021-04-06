export type Market = {
  id: number
  title: string
  type: string
  category: string
  address: string
  outcomes: Outcome[]
}

export type Outcome = {
  name: string
  address: string
}

export type MarketDTO = {
  id: number
  title: string
  type: string
  category: string
  outcome1Name: string
  outcome1Address: string
  outcome2Name: string
  outcome2Address: string
  marketAddress: string
}