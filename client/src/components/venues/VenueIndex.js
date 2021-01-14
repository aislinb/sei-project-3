import React from 'react'
import { getAllVenues } from '../../lib/api'
import { Link } from 'react-router-dom'
import RingLoader from 'react-spinners/RingLoader'


function venueIndex() {
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

  return (
    <main>
      {/* <h3> - Add filter buttons to browse by continent/country here -</h3>
      <h3> Browse an event that took place at your chosen venue: </h3> */}
      <div className="index-header">
        <h1>Browse Venues</h1>
        <button>
          <Link to="/map">Map View</Link>
        </button>
        <button>
          <Link to="/venues/new">Add Venue</Link>
        </button>
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