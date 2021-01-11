import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { isAuthenticated, logout } from '../../lib/auth'

function Nav() {

  const isLoggedIn = isAuthenticated()
  const history = useHistory()

  const handleLogout = () => {
    logout()
    history.push('/') // logs out & returns user to homepage
  }

  return (
    <nav>
      <ul>
        <li> 
          <Link to="/">Home</Link>
        </li>
        <li> 
          <Link to="/events">Events</Link>
        </li>
        <li> 
          <Link to="/venues">Venues</Link>
        </li>
        <li> 
          <div className="buttons">
            {!isLoggedIn ?
              <>
                <Link className="nav-button" to="/register">
                      Register
                </Link>
                <Link className="nav-button" to="/login">
                      Log in
                </Link>
              </>
              :
              <button className="nav-button" onClick={handleLogout}>Log Out </button>
            }
          </div>
        </li>
      </ul>
    </nav>
  )
}

export default Nav