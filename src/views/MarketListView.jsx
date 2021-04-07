import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import MarketResume from "../components/MarketResume"
import Filters from '../components/Filters'

import './MarketListView.css'
import { fetchMarkets } from '../redux/markets/middlewares'
import { useConnection } from "../utils/connection.helper"
const MarketListView = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [currentFilters, setCurrentFilters] = useState([])
  const { markets, filters } = useSelector( state => state.markets )
  useEffect(() => {
      dispatch(fetchMarkets()).finally(() => setLoading(false))
       // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // renders 
  const renderMarkets = () => {
    return markets.filter(market => !currentFilters.length || currentFilters.includes(market.category)).map((market) => <div key={market.id} className="item-fadeIn"><MarketResume  market={market}/></div>)
  }
   const renderMarketSkeletons = (times) => {
    return [...Array(times)].map((item, index) => <div key={`skeleton${index}`} className="w-full bg-depth-1 h-24 rounded skeleton"></div>)
   }

   const renderFiltersSkeletons = () => {
    return <div className="w-60 bg-depth-1 h-10 rounded skeleton"></div>
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
      <div>
        <div className="my-5 flex justify-center">
          { renderFiltersSkeletons(3) }
        </div>
        <div className="w-full flex items-center justify-center">
          <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            { renderMarketSkeletons(5)}
          </div>
        </div>
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
