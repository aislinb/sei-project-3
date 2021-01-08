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
        <ul>
          {events.map(item => {
            const { _id, name, date, description, eventImage } = item
            return (
              <li key={_id}>
                <Link to={`/events/${_id}`}>
                  <p>{name}</p>
                  <p>{date /*Need to convert this into day, month*/}</p>
                  <p>{item.venue.name}</p>
                  <p>{item.venue.city}</p>
                  <p>{item.venue.country}</p>
                  <p>{description}</p>
                  <img src={eventImage} alt={name} />
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