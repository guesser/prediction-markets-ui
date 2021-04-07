import { Market } from "@project-serum/serum";
import { Account, Connection, PublicKey } from "@solana/web3.js";
import { useEffect, useState } from "react";
import { useConnection } from "./connection.helper";
import { useWallet } from "./wallet.utils";
type direction = 'asks' | 'bids'
// const PROGRAM_ID = '9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin'
const PROGRAM_ID = 'DESVgJVGajEgKGXhb6XmqDHGz3VjdgP7rEVESBgxmroY'

export function useSerumMarket(address: PublicKey) : [
  Market | null, [number, number, any, any][], [number, number, any, any][], number, number, Function
] {
  const connection = useConnection()
  const { connected, wallet, select, connect, disconnect } = useWallet();
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
    let orders = direction === 'asks' ? (await getAsks() || []) : (await getBids() || [])
    return orders?.map(([price, size]) => size).reduce((a, b) => a + b, 0)
  }

  const filledOrders = (amount: number): [number, number, any, any][] => {
    let orders: [number, number, any, any][] = []
    let i = 0
    while(i < asks.length && amount > 0) {
      let [price, size] = asks[i]
      orders.push(asks[i])
      amount = amount - size
      ++i
    }
    return orders
  }

  const placeTrade = async (amount: number) => {
    // await market?.placeOrder(connection, {
    //   owner: new Account(wallet?.),
    //   payer: new PublicKey(),
    //   side: 'buy', // 'buy' or 'sell'
    //   price: 123.45,
    //   size: 17.0,
    //   orderType: 'limit', // 'limit', 'ioc', 'postOnly'
    // });
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
      filledOrders
    ];
}
