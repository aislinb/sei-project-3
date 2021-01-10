import React from 'react'
import { getAllEvents } from '../../lib/api'
import { Link } from 'react-router-dom'

function EventIndex() {
  const [events, setEvents] = React.useState([])

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getAllEvents()
        setEvents(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])


  return (
    <main>
      <h1>Highlights of 2020</h1>
      {events ?
        <ul className="index-list">
          {events.map(item => {
            // De-structured fields from the event object
            const { _id, name, date, description, eventImage } = item
            // Convert ISO date into JS format date
            const jsDate = new Date(date)
            // Get the day of the month
            const day = jsDate.getDate()
            // Get the actual month - months begin at 0
            const month = jsDate.getMonth() + 1
            // Get the year
            const year = jsDate.getFullYear()
            return (
              <li key={_id}>
                <Link to={`/events/${_id}`}>
                  <h3>{name}</h3>
                  <h5>{day}/{month}/{year}</h5>
                  {/* <h6>{item.venue.name}, {item.venue.city}, {item.venue.country}</h6> */}
                  <p>{description}</p>
                  <figure>
                    <img src={eventImage} alt={name} />
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

export default EventIndex