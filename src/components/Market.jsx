import { Link } from "react-router-dom"

const OddBar = ({ percent }) => {
  return (
    <div className="w-full bg-default h-2 overflow-hidden">
      <div className="bg-primary h-2" style={ {width: percent+'%'}}></div>
    </div>
  )
}

const Market = ({market: {id, title}}) => {
  return (
    <Link to={`/market/${id}`}>
      <div className="rounded bg-depth-1 p-2 shadow-sm hover:bg-depth-2 transition-color duration-100 ease-in">
        <div className="font-bold text-md mb-4">
          { title }
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p>Outcome 1</p>
            <OddBar percent={50} />  
          </div>
          <div>
            <p>Outcome 1</p>
            <OddBar percent={50} />  
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Market