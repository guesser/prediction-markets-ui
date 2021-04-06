import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowDown, faRetweet, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { fetchMarketById } from '../redux/markets/middlewares'
import Select from 'react-select'
import { theme, customStyle} from './../theme/select.theme'
import { Account, Connection, PublicKey } from '@solana/web3.js';
import { Market } from '@project-serum/serum';


const MarketView = () => {
  const [loading, setLoading] = useState(true)
  const [from, setFrom] = useState(null)
  const [to, setTo] = useState(null)
  const { id } = useParams()

  const serum = async () => {
    let connection = new Connection('https://api.mainnet-beta.solana.com');
    let marketAddress = new PublicKey('HWHvQhFmJB3NUcu1aihKmrKegfVxBEHzwVX6yZCKEsi1');
    let programId = new PublicKey('9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin'); // Serum program v3
    let market = await Market.load(connection, marketAddress, {}, programId)
    let bids = await market.loadBids(connection);
    let asks = await market.loadAsks(connection);
    console.log('asks', asks)
    console.log('bids', bids)
    for (let [price, size] of bids.getL2(20)) {
      console.log(price, size);
    }
  }
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchMarketById(id)).finally(() => setLoading(false))
    serum()
  })
  const market = useSelector(state => state.markets.markets.find(market => market.id === parseInt(id)))
  // handlers
  const handleSelect = (option, setter) => {
    setter(option)
  }
  const options = [{label:'BTC', value: 'BTC'}, {label:'ETH', value: 'ETH'}, {label:'BBT', value: 'BBT'}, {label:'BTF', value: 'BTF'}]
  //renders
  const renderMarket = () => {
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
              <input autoComplete="off" placeholder="0.0" className="no-arrows font-mono outline-none text-md bg-depth-1" id="from" type="number"/>
            </div>
            <div className="flex-1">
              <Select id="from" value={from} onChange={(o) => handleSelect(o, setFrom)} styles={customStyle} theme={theme} options={options}/>
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
              <Select id="to" value={to} onChange={(o) => handleSelect(o, setTo)} styles={customStyle} theme={theme} options={options}/>
            </div>
          </div>
          <button className="my-4 w-full uppercase font-bold text-center bg-gradient-to-r from-primary to-secondary text-opposite rounded-md px-6 py-4 text-md shadow hover:text-default transition-color duration-150 ease-in">Swap <FontAwesomeIcon icon={faRetweet} /></button>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center h-full">
    { loading ? <FontAwesomeIcon className="opacity-50 text-2xl" spin icon={faSpinner} /> : renderMarket()}
    </div>
  )
}
export default MarketView
