import { Market } from "@project-serum/serum";
import { Connection, PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { useConnection } from "./connection.helper";
type direction = 'asks' | 'bids'
const PROGRAM_ID = '9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin'
export const getTransactions = async (from: PublicKey, to: PublicKey, amount: number) => {
  let connection = new Connection('https://api.mainnet-beta.solana.com');
  let marketAddress = new PublicKey('HWHvQhFmJB3NUcu1aihKmrKegfVxBEHzwVX6yZCKEsi1');
  let programId = new PublicKey('9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin');// Serum program v3
  let market = await Market.load(connection, marketAddress, {}, programId)
  let asks = await market.loadAsks(connection);
  let orderBook = asks.getL2(1000000000)
  console.log(orderBook.map(([price, size]) => size).reduce((a, b) => a + b, 0))
  let orders: [number, number, any, any][] = []
  let i = 0
  while(i < orderBook.length && amount > 0) {
    let [price, size] = orderBook[i]
    orders.push(orderBook[i])
    amount = amount - size
    ++i
  }
  return orders
}


export function useSerumMarket(address: PublicKey) : [
  Market | null, [number, number, any, any][], [number, number, any, any][], number, number
] {
  const connection = useConnection()
  const [market, setMarket] = useState<Market | null>(null)
  const [asks, setAsks] = useState<[number, number, any, any][]>([])
  const [bids, setBids] = useState<[number, number, any, any][]>([])
  const [bidLiquidity, setBidLiquidity] = useState<number>(0)
  const [askLiquidity, setAskLiquidity] = useState<number>(0)
  const getAsks = async (amount: number = 10000000000) => {
    let asks = (await market?.loadAsks(connection))?.getL2(amount)
    return asks || []
  }

  const getBids = async (amount: number = 10000000000) => {
    let bids = (await market?.loadBids(connection))?.getL2(amount)
    return bids || []
  }

  const totalLiquidity = async (direction: direction) => {
    debugger
    let orders = direction === 'asks' ? (await asks || []) : (await bids || [])
    return orders?.map(([price, size]) => size).reduce((a, b) => a + b, 0)
  }
  useEffect(() => {
    const getMarket = async () => {
      let programId = new PublicKey(PROGRAM_ID);// Serum program v3
      let serumMarket = await Market.load(connection, address as PublicKey, {}, programId)
      if (!market) setMarket(serumMarket)
      console.log(market)
      debugger
      setAsks(await getAsks())
      setBids(await getBids())
      setAskLiquidity(await totalLiquidity('asks'))
      setBidLiquidity(await totalLiquidity('bids'))
    }
    debugger
    if (address) getMarket()
  }, [market])
  
    return [
      market,
      asks,
      bids,
      bidLiquidity,
      askLiquidity,
    ];
}
