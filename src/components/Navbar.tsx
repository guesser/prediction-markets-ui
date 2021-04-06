import { Link } from "react-router-dom"
import Wallet from './Wallet'
const Navbar = () => {
  return (
    <nav className="flex bg-depth-1 justify-center">
      <div className="h-12 container flex items-center justify-between w-full px-2">
        <div className="font-bold text-md">
          <Link to="/"> <span className="text-primary">BET</span>x </Link>
        </div>
        <div>
          <Wallet></Wallet>
        </div>
      </div>
    </nav>
  )
}
export default Navbar