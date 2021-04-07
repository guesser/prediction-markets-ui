import { Link } from "react-router-dom"
import PropTypes from 'prop-types'
import { Market as MarketType } from "../types/common.type"
import { Account, Connection, PublicKey } from '@solana/web3.js';
import { Market } from '@project-serum/serum';
import { useEffect, useState } from "react";
import { useAccountInfo } from "../utils/connection.helper";
const OddBar = ({ percent }: { percent: number }) => {
  return (
    <div className="w-full bg-default h-2 overflow-hidden">
      <div className="bg-primary h-2" style={ {width: percent+'%'}}></div>
    </div>
  )
}

OddBar.propTypes = {
  percent: PropTypes.number
}

const MarketResume = ({ market: {id, title, outcomes}} : { market: MarketType }) => {
  const [loadingOrderbook, setLoading] = useState(true)
  const [bestPrice, setBestPrice] = useState<number | null>(0)
  const [market, setMarket] = useState<Market | null>(null)
  useEffect(() => {
    (async () => {
      let connection = new Connection('https://api.mainnet-beta.solana.com');
      let marketAddress = new PublicKey('HWHvQhFmJB3NUcu1aihKmrKegfVxBEHzwVX6yZCKEsi1');
      let programId = new PublicKey('9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin'); // Serum program v3
      let market = await Market.load(connection, marketAddress, {}, programId)
      setMarket(market)
      let bids = await market.loadBids(connection);
      let asks = await market.loadAsks(connection);
      let orderBook = asks.getL2(1)
      setBestPrice(orderBook ? orderBook[0][0] : null)
      setLoading(false)
    })()
  }, [])
  return (
    <Link to={`/market/${id}`}>
      <div className="rounded bg-depth-1 p-2 shadow-sm hover:bg-depth-2 transition-color duration-100 ease-in">
        <div className="font-bold text-md mb-4">
          { title }
        </div>
        {
          loadingOrderbook ?
          <div className="bg-depth-2 w-full h-8 rounded skeleton"></div> :
          <div>
            <div className="flex items-center justify-between">
              <div>{ outcomes[0].name }</div>
              <div className="bg-opacity-70 rounded bg-primary text-opposite font-bold px-2 py-1">{ bestPrice } <span className="text-default">SOL</span></div>
            </div>
            {/* <OddBar percent={bestPrice} />   */}
          </div>
        }
      </div>
    </Link>
  )
}

export default MarketResume