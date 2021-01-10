import React from 'react'
import { Link } from 'react-router-dom'

function Nav() {
  return (
    <nav>
      <div className="logo">
        <div className="logo-text">20</div>
        <div className="material-icons logo-img">movie_filter</div>
        <div className="logo-text">20</div>
      </div>
      <ul>
        <li> 
          <Link to="/">
            <span>Home</span>
            {/* <span className="material-icons">home</span> */}
          </Link>
        </li>
        <li> 
          <Link to="/events">Events</Link>
        </li>
        <li> 
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav