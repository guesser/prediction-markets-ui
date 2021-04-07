import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { fetchMarketById } from '../redux/markets/middlewares'
import { useHistory } from "react-router-dom";
import SwapBox from '../components/SwapBox'
import { PublicKey } from '@solana/web3.js'


const MarketView = () => {
  const [loading, setLoading] = useState(true)
  const [addr1, setAddr1] = useState(null)
  const [addr2, setAddr2] = useState(null)
  const { id } = useParams()
  const history = useHistory();
  const dispatch = useDispatch()
  const market = useSelector(state => state.markets.markets.find(market => market.id === parseInt(id)))
  useEffect(() => {
    (async () => {
      await dispatch(fetchMarketById(id))
      let marketAddress = new PublicKey('HWHvQhFmJB3NUcu1aihKmrKegfVxBEHzwVX6yZCKEsi1');
      setAddr1(marketAddress)
      setAddr2(marketAddress)
      setLoading(false)
    })()
  }, [])


  //renders
  const renderMarket = () => {
    if (!market) history.push('/404')
    else return <SwapBox serumMarkets={[addr1, addr2]} market={market}/>
  }

  return (
    <div className="flex justify-center items-center h-full">
    { loading ? <FontAwesomeIcon className="opacity-50 text-2xl" spin icon={faSpinner} /> : renderMarket()}
    </div>
  )
}
export default MarketView
