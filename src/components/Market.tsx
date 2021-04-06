import { Link } from "react-router-dom"
import PropTypes from 'prop-types'
import { Market as MarketType } from "../types/common.type"
import { useConnection } from "../utils/connection.helper"
const OddBar = ({ percent }: { percent: number }) => {
  return (
    <div className="w-full bg-default h-2 overflow-hidden">
      <div className="bg-primary h-2" style={ {width: percent+'%'}}></div>
    </div>
  )
}

OddBar.propTypes = {
  percent: PropTypes.number.isRequired
}

const Market = ({ market: {id, title, outcomes}} : { market: MarketType }) => {
  const connection = useConnection()
  
  return (
    <Link to={`/market/${id}`}>
      <div className="rounded bg-depth-1 p-2 shadow-sm hover:bg-depth-2 transition-color duration-100 ease-in">
        <div className="font-bold text-md mb-4">
          { title }
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p>{outcomes[0].name}</p>
            <OddBar percent={50} />  
          </div>
          <div>
            <p>{outcomes[1].name}</p>
            <OddBar percent={50} />  
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Market