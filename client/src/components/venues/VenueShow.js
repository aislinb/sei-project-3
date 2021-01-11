import React from 'react'
import { useParams } from 'react-router-dom'
import { getSingleVenue } from '../../lib/api'

function venueShow() {
  const [venue, setVenue] = React.useState([])

  const { id } = useParams()

  React.useEffect(() => {

    const getData = async () => {
      try {
        const { data } = await getSingleVenue(id)
        setVenue(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [id])

  // De-structured fields from the event object
  const { name, city, country, venueImage } = venue

  // AB - also having issues with adding events taking place at the venue

  return (
    <main>
      <section className="event-detail">
        <h1>{name}</h1>
        <h5>{city}, {country}</h5>
        <figure>
          <img src={venueImage} alt={name} />
        </figure>
        
      </section>
      <hr />
      <section>
        <h3>Review This Venue</h3>
        <form>
          <div>
            <label>Rate this Venue (1 to 5) 💉</label>
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

export default venueShow