import React from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { isAuthenticated, logout } from '../../lib/auth'

function Nav() {
  useLocation()
  const isLoggedIn = isAuthenticated()
  const history = useHistory()
  const [isOpen, setIsOpen] = React.useState(false)
  const { pathname } = useLocation()

  const handleMenuToggle = () => {
    setIsOpen(!isOpen)
  }

  React.useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const handleLogout = () => {
    logout()
    history.push('/') // logs out & returns user to homepage

  }

  return (
    <nav>
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            <div className="logo">
              <div className="logo-text">20</div>
              <div className="material-icons logo-img">movie_filter</div>
              <div className="logo-text">20</div>
            </div>
          </Link>
          <div> 
            <Link to="/events" className="navbar-item">Events</Link>
          </div>
          <div> 
            <Link to="/venues" className="navbar-item">Venues</Link>
          </div>
          <div> 
            <Link to="/map" className="navbar-item">Map</Link>
          </div>
          <span onClick={handleMenuToggle} className={`navbar-burger ${isOpen ? 'is-active' : ''}`}>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </span>
        </div>
        <div className={`navbar-menu ${isOpen ? 'is-active' : ''}`}> 
          <div className="buttons">
            {!isLoggedIn ?
              <>
                <div className="navbar-start">
                  <Link className="nav-button navbar-item" to="/register">
                        Register
                  </Link>
                </div>
                <div className="navbar-end">
                  <Link className="nav-button navbar-item" to="/login">
                        Log in
                  </Link>
                </div>
              </>
              :
              <>
                <div className="navbar-start">
                  <button className="nav-button navbar-item">
                    <Link to="/profile">My Profile</Link>
                  </button>
                </div>
                <div className="navbar-end">
                  <button className="nav-button navbar-item" onClick={handleLogout}>Log Out</button>
                </div>
              </>
            }
          </div>
        </div>
      </div>  
    </nav>
  )
}

export default Nav