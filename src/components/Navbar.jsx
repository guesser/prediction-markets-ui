import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="flex bg-depth-1 justify-center">
      <div className="h-12 container flex items-center justify-between w-full px-2">
        <div className="font-bold text-md">
          <Link to="/"> <span className="text-primary">BET</span>x </Link>
        </div>
        <div>
          <button className="px-2 py-1 border border-primary rounded text-primary hover:border-opposite hover:text-default">Connect</button>
        </div>
      </div>
    </nav>
  )
}
export default Navbar