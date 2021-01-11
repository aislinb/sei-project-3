import React from 'react'
import { getAllVenues } from '../../lib/api'
import { Link } from 'react-router-dom'


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
  return (
    <main>
      <h2> - Map of venues will go here - </h2>
      <h3> - Add filter buttons to browse by continent/country here -</h3>
      <h3> Browse an event that took place at your chosen venue: </h3>
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
        <div>Loading events...</div>
      }
    </main>
  )
}

export default venueIndex