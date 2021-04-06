import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import MarketResume from "../components/Market"
import Filters from '../components/Filters'
import { Account, Connection, PublicKey } from '@solana/web3.js';
import { Market } from '@project-serum/serum';

import './MarketListView.css'
import { fetchMarkets } from '../redux/markets/middlewares'
import { useConnection } from "../utils/connection.helper"
const MarketListView = () => {
  const connection = useConnection()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [currentFilters, setCurrentFilters] = useState([])
  const { markets, filters } = useSelector( state => state.markets )
  const serum = async () => {
    let connection = new Connection('https://api.mainnet-beta.solana.com');
    let marketAddress = new PublicKey('HWHvQhFmJB3NUcu1aihKmrKegfVxBEHzwVX6yZCKEsi1');
    let programId = new PublicKey('9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin'); // Serum program v3
    let market = await Market.load(connection, marketAddress, {}, programId)
    let bids = await market.loadBids(connection);
    let asks = await market.loadAsks(connection);
    for (let [price, size] of asks.getL2(20)) {
      console.log(price, size);
    }
  }
  useEffect(() => {
      dispatch(fetchMarkets()).finally(() => setLoading(false))
       // eslint-disable-next-line react-hooks/exhaustive-deps
       serum()
  }, [])

  // renders 
  const renderMarkets = () => {
    return markets.filter(market => !currentFilters.length || currentFilters.includes(market.category)).map((market) => <div key={market.id} className="item-fadeIn"><MarketResume  market={market}/></div>)
  }

  // handlers
  const handleFilterToggle = (filter) => {
    if (currentFilters.includes(filter)) {
      setCurrentFilters(currentFilters.filter(f => f !== filter))
    }
    else setCurrentFilters([...currentFilters, filter])
  }

  return (
    loading ? 
      <div className="w-full flex items-center justify-center">
        <FontAwesomeIcon className="opacity-50 text-2xl" spin icon={faSpinner} />
      </div>
    :
    <div>
      <div className="my-5 flex justify-center">
        <Filters filters={filters} handler={handleFilterToggle} currentFilters={currentFilters} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      { renderMarkets() }
      </div>
    </div>
  )
}
export default MarketListView
