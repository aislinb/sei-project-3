import React from 'react'
import { Link, useLocation, useHistory } from 'react-router-dom'
import { isAuthenticated, logout } from '../../lib/auth'

function Nav() {
  useLocation()
  const isLoggedIn = isAuthenticated()
  const history = useHistory()
  // const [isOpen, setIsOpen] = React.useState(false)
  // const { pathname } = useLocation()

  // const handleMenuToggle = () => {
  //   setIsOpen(!isOpen)
  // }

  // React.useEffect(() => {
  //   setIsOpen(false)
  // }, [pathname])

  const handleLogout = () => {
    logout()
    history.push('/') // logs out & returns user to homepage

  }

  return (
    <nav>
      <Link to="/">
        <div className="logo">
          <div className="logo-text">20</div>
          <div className="material-icons logo-img">movie_filter</div>
          <div className="logo-text">20</div>
        </div>
      </Link>
      <ul>
        <li> 
          <Link to="/events">Events</Link>
        </li>
        <li> 
          <Link to="/venues">Venues</Link>
        </li>
        <li> 
          <Link to="/map">Map</Link>
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
              <>
                <Link to="/profile">
                  <button className="nav-button">My Profile</button>
                </Link>
                <button className="nav-button" onClick={handleLogout}>Log Out</button>
              </>
            }
          </div>
        </li>
      </ul>
    </nav>

  //BELOW IS STYLED READY FOR BULMA USE
  // <nav>
  //   <div className="container">
  //     <div className="navbar-brand">
  //       <Link to="/" className="navbar-item">
  //         <div className="logo">
  //           <div className="logo-text">20</div>
  //           <div className="material-icons logo-img">movie_filter</div>
  //           <div className="logo-text">20</div>
  //         </div>
  //       </Link>
  //       <div> 
  //         <Link to="/events" className="navbar-item">Events</Link>
  //       </div>
  //       <div> 
  //         <Link to="/venues" className="navbar-item">Venues</Link>
  //       </div>
  //       <div> 
  //         <Link to="/map" className="navbar-item">Map</Link>
  //       </div>
  //       <span onClick={handleMenuToggle} className={`navbar-burger ${isOpen ? 'is-active' : ''}`}>
  //         <span aria-hidden="true"></span>
  //         <span aria-hidden="true"></span>
  //         <span aria-hidden="true"></span>
  //       </span>
  //     </div>
  //     <div className={`navbar-menu ${isOpen ? 'is-active' : ''}`}> 
  //       <div className="buttons">
  //         {!isLoggedIn ?
  //           <>
  //             <div className="navbar-start">
  //               <Link className="nav-button navbar-item" to="/register">
  //                     Register
  //               </Link>
  //             </div>
  //             <div className="navbar-end">
  //               <Link className="nav-button navbar-item" to="/login">
  //                     Log in
  //               </Link>
  //             </div>
  //           </>
  //           :
  //           <>

  //             <div className="navbar-start">
  //               <Link to="/profile">
  //                 <button className="nav-button navbar-item">My Profile</button>
  //               </Link>
  //             </div>
  //             <div className="navbar-end">
  //               <button className="nav-button navbar-item" onClick={handleLogout}>Log Out</button>
  //             </div>
  //           </>
  //         }
  //       </div>
  //     </div>
  //   </div>  
  // </nav>
  )
}

export default Nav