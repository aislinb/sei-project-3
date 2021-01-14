import React from 'react'
import { getAllVenues } from '../../lib/api'
import { Link } from 'react-router-dom'
import RingLoader from 'react-spinners/RingLoader'
import { isAuthenticated } from '../../lib/auth'


function venueIndex() {
  const isLoggedIn = isAuthenticated()

  const [venues, setVenues] = React.useState([])

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getAllVenues()
        setVenues(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  function compare( a, b ) {
    if ( a.name < b.name ){
      return -1
    }
    if ( a.name > b.name ){
      return 1
    }
    return 0
  }
  venues.sort( compare )

  const reloadPage = () => {
    window.location.reload()
  }
  

  return (
    <main>
      <div className="index-header">
        <h1>Browse Venues</h1>
        <Link to="/map"><button className="link-button">
          Map View
        </button></Link>
        {isLoggedIn ? 
          <Link to="/venues/new"><button className="link-button" >
              Add Venue
          </button></Link>
          :
          <h6></h6>
        }
        <Link to="/venues/"><button className="link-button" onClick={reloadPage} >
          Reset Selection
        </button></Link>
      </div>
      {venues ?
        <ul className="index-list">
          {venues.map(item => {
          // De-structured fields from the event object
            const { _id, name, city, country, venueImage } = item
            return (
              <li key={_id}>
                <Link to={`/venues/${_id}`}>
                  <h3>{name}</h3>
                  <h5>{city}, {country}</h5>
                  <figure>
                    <img src={venueImage} alt={name} />
                  </figure>
                </Link>
              </li>
            )
          })

          }
        </ul>
        :
        <div className="ring-loader">
          <RingLoader color="purple" size={60} />
        </div>
      }
    </main>
  )
}

export default venueIndex