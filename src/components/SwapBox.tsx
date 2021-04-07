import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faRetweet } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import Select from 'react-select'
import { theme, customStyle} from '../theme/select.theme'
import { useWallet } from '../utils/wallet.utils';
import { useSerumMarket } from '../utils/transaction.helper'
import { Market as MarketType } from '../types/common.type'
import { PublicKey } from '@solana/web3.js'
import { ThemeConfig } from 'react-select/src/theme'


const SwapBox = ({ serumMarkets, market } : { serumMarkets: PublicKey[], market: MarketType}) => {
  const [from, setFrom] = useState<PublicKey | null>(null)
  const [to, setTo] = useState<PublicKey | null>(null)
  const { connected } = useWallet();
  const [ amount, setAmount ] = useState<number>(0)
  const [options, setOptions] = useState<any[]>([])
  const [
    first_market,
    first_asks,
    first_bids,
    first_bidLiquidity,
    first_askLiquidity,
    filledOrders
  ] = useSerumMarket(serumMarkets[0])
  //   const [
  //   second_market,
  //   second_asks,
  //   second_bids,
  //   second_bidLiquidity,
  //   second_askLiquidity,
  // ] = useSerumMarket(serumMarkets[1])
  

  useEffect(() => {
    if (market && first_market) {
      setOptions([
        {label: 'SOL', value: first_market.baseMintAddress.toString()},
        {label: market.outcomes[0].name, value: first_market.quoteMintAddress.toString()},
        {label: market.outcomes[1].name, value: first_market.quoteMintAddress}
      ])
    }
  }, [market, first_market])
  // handlers
  const handleSelect = (option, setter) => {
    setter(option)
  }
  const swap = async () => {
    let tx = filledOrders(amount)
    console.log(tx)
  }

  return (
    <div className="w-full relative max-w-md">
      {/* CONSULTAR */}
      {/* <div className="absolute top-0 -m-4 rounded-xl opacity-30 w-full h-full bg-primary"></div>
      <div className="absolute top-0 m-4 rounded-xl opacity-30 w-full h-full bg-secondary"></div> */}
      <div className="relative w-full max-w-md p-4 shadow bg-depth-1 rounded-xl">
        <h1 className="px-4 text-center font-bold text-lg mb-4">{market.title}</h1>
        <div className="rounded-2xl border border-depth-2 py-4 px-6 flex justify-between items-end">
          <div>
            <div className="text-depth-1 uppercase text-sm mb-2">swap</div>
            <input min="0" onChange={({ target: { value}}) => setAmount(parseFloat(value))} value={amount} autoComplete="off" placeholder="0.0" className="no-arrows font-mono outline-none text-md bg-depth-1" id="from" type="number"/>
          </div>
          <div className="flex-1">
            <Select id="from" value={from} onChange={(o) => handleSelect(o, setFrom)} styles={customStyle} theme={theme as any} options={[options[0]]}/>
          </div>
        </div>
        <div className="my-4 text-primary flex justify-center">
          <FontAwesomeIcon className="opacity-40 text-lg" icon={faArrowDown} />
        </div>
        <div className="rounded-2xl border border-depth-2 py-4 px-6 flex justify-between items-end">
          <div>
            <div className="text-depth-1 uppercase text-sm mb-2">To</div>
            <input autoComplete="off" placeholder="0.0" className="no-arrows font-mono outline-none text-md bg-depth-1" id="from" type="number"/>
          </div>
          <div className="flex-1">
            <Select id="to" value={to} onChange={(o) => handleSelect(o, setTo)} styles={customStyle} theme={theme as any} options={[options[1], options[2]]}/>
          </div>
        </div>
        <div className="p-2 text-sm uppercase text-primary text-right">max liquidity { first_askLiquidity }</div>
        <button onClick={swap} className="my-4 w-full uppercase font-bold text-center bg-gradient-to-r from-primary to-secondary text-opposite rounded-md px-6 py-4 text-md shadow hover:text-default hover:disabled:text-opposite transition-color duration-150 ease-in disabled:opacity-20 disabled:cursor-not-allowed">Swap <FontAwesomeIcon icon={faRetweet} /></button>
      </div>
    </div>
  )
}
export default SwapBox
