import { ThemeProvider } from "../themeContext"
import Navbar from './Navbar'
import MarketListView from '../views/MarketListView'
import MarketView from '../views/MarketView'
import Notifications from 'react-notify-toast';

import {
  HashRouter as Router,
  Switch,
  Route
} from "react-router-dom"
import NotFound from "../views/404"

const Layout = () => {
  return (
    <ThemeProvider initialTheme="light">
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1 flex justify-center">
              <div className="container my-10 w-full">
              <Switch>
                <Route exact path="/" component={MarketListView} />
                <Route exact path="/market/:id" component={MarketView} />
                <Route component={NotFound} />
              </Switch>
              </div>
          </main>
        </div>
      </Router>
      <Notifications />
    </ThemeProvider>
  )
}
export default Layout