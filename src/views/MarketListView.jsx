import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import Market from "../components/Market"
import Filters from '../components/Filters'
import './MarketListView.css'
import { fetchFilters, fetchMarkets } from '../redux/markets/middlewares'
const MarketListView = () => {
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)
  const [currentFilters, setCurrentFilters] = useState([])
  const { markets, filters } = useSelector( state => state.markets )
  useEffect(() => {
    Promise.all([
      dispatch(fetchMarkets()),
      dispatch(fetchFilters())
    ]).finally(() => setLoading(false))
       // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // renders 
  const renderMarkets = () => {
    return markets.filter(market => !currentFilters.length || currentFilters.includes(market.type)).map((market) => <div key={market.id} className="item-fadeIn"><Market  market={market}/></div>)
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
      <div className="grid grid-cols-3 gap-5">
      { renderMarkets() }
      </div>
    </div>
  )
}
export default MarketListView
