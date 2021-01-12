import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { deleteEvent, getSingleEvent, createComment } from '../../lib/api'
import { isOwner } from '../../lib/auth'
import useForm from '../../utils/useForm'

function EventShow() {
  const [event, setEvent] = React.useState([])

  const { formdata, handleChange } = useForm({
    text: '', 
    rating: 1,
    owner: {}
  })

  const history = useHistory()
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
  }, [id, event.owner])

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

<<<<<<< HEAD
  // ! DELETE Function
  const handleDelete = async () => {
    try {
      await deleteEvent(id)
      history.push('/events')
    } catch (err) {
      console.log(err)
    }
  }

  // * Submit Reviews
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await createComment(formdata)
      alert(data)
    } catch (err) {
      console.log(err)
    }
=======
  function handleRating(e) {
    const rating = e.target.value
    console.log(rating)
    // event.preventDefault()
>>>>>>> development
  }

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
        <figure>
          <img src={eventImage} alt={name} />
        </figure>
        <p>{description}</p>
        {event.owner && event ?
          isOwner(event.owner._id) && 
          <button className="delete-btn" onClick={handleDelete}>Delete</button>
          :
          <div>Loading...</div>
        }
      </section>
      <hr />
      <section>
        <h3>Review This Event</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Rate Event (1 to 5) 💉</label>
          </div>
          <div>
            <input 
              type="number" 
              placeholder="5" 
              min="1" 
              max="5" 
              onChange={handleChange}
              value={formdata.rating}
            />
          </div>
          <br />
          <div>
            <label>Write Your Review</label>
          </div>
          <textarea 
            placeholder="Tell us what you thought..."
            onChange={handleChange}
            value={formdata.text}
          />
          <button type="submit" className="submit-btn">Submit</button>
      <section className="reviews">
        <h3>Review {event.name}</h3>
        <form>
          <section className="rate-event">
            <div>
              <label>Rate Event (1 to 5) 💉 :</label>
            </div>
            <div className="rate">
              <input onClick={handleRating} type="radio" id="star5" name="rate" value="5" />
              <label htmlFor="star5" title="text">5</label>
              <input onClick={handleRating} type="radio" id="star4" name="rate" value="4" />
              <label htmlFor="star4" title="text">4</label>
              <input onClick={handleRating} type="radio" id="star3" name="rate" value="3" />
              <label htmlFor="star3" title="text">3</label>
              <input onClick={handleRating} type="radio" id="star2" name="rate" value="2" />
              <label htmlFor="star2" title="text">2</label>
              <input onClick={handleRating} type="radio" id="star1" name="rate" value="1" />
              <label htmlFor="star1" title="text">1</label>
            </div>
          </section>
          <br />
          <br />
          <section className="avgRating">
            <div>
              <label>Average Rating:</label>
              <div>{event.avgRating}</div>
            </div>
          </section>
          <br />
          <br />
          <section className="text-review">
            <div>
              <label>Write Your Review</label>
            </div>
            <div>
              <textarea placeholder="Tell us what you thought..."/>
            </div>
          </section>
        </form>
      </section>
    </main>
    
  )
}

export default EventShow