import React from 'react'
import { useParams } from 'react-router-dom'
import { getSingleEvent } from '../../lib/api'

function EventShow() {
  const [event, setEvent] = React.useState([])

  const { id } = useParams()

  React.useEffect(() => {

    const getData = async () => {
      try {
        const { data } = await getSingleEvent(id)
        setEvent(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [id])

  // De-structured fields from the event object
  const { name, date, description, eventImage } = event
  // Convert ISO date into JS format date
  const jsDate = new Date(date)
  // Get the day of the month
  const day = jsDate.getDate()
  // Get the actual month - months begin at 0
  const month = jsDate.getMonth() + 1
  // Get the year
  const year = jsDate.getFullYear()

  return (
    <main>
      <section className="event-detail">
        <h1>{name}</h1>
        <h5>{day}/{month}/{year}</h5>
        {event.venue ?
          <h6>{event.venue.name}, {event.venue.city}, {event.venue.country}</h6>
          :
          <h6></h6>
        }
        <p>{description}</p>
        <figure>
          <img src={eventImage} alt={name} />
        </figure>
        
      </section>
      <hr />
      <section>
        <h3>Review This Event</h3>
        <form>
          <div>
            <label>Rate Event (1 to 5) 💉</label>
          </div>
          <div>
            <input type="number" placeholder="5" min="1" max="5"/>
          </div>
          <br />
          <div>
            <label>Write Your Review</label>
          </div>
          <div>
            <textarea placeholder="Tell us what you thought..."/>
          </div>
        </form>
      </section>
    </main>
    
  )
}

export default EventShow