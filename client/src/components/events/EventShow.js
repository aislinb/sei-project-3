import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { deleteEvent, getSingleEvent, createEventComment } from '../../lib/api'
import { isOwner } from '../../lib/auth'
import useForm from '../../utils/useForm'
import { isAuthenticated } from '../../lib/auth'
import { Link } from 'react-router-dom'

function EventShow() {
  const [event, setEvent] = React.useState([])

  const isLoggedIn = isAuthenticated()

  const { formdata, handleChange } = useForm({
    text: '', 
    rating: '',
    owner: {}
  })

  const stars = []

  for (let i = 0; i < event.avgRating; i++) {
    stars.push('★')
  }

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
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createEventComment(formdata, event._id)
      window.location.reload()
      // window.alert(`Submitting ${JSON.stringify(formdata, null, 2)}`)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <main>
      <section className="event-detail">
        <h1>{name}</h1>
        <h5>{day}/{month}/{year}</h5>
        {event.venue ?
          <h6><Link to={`/venues/${event.venue.id}`}>{event.venue.name}</Link>, {event.venue.city}, {event.venue.country}</h6>
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

      <section className="add-review">
        <h3>Review {event.name}</h3>
        {isLoggedIn ? 
          <form onSubmit={handleSubmit}>
            <section className="rate-event">
              <div>
                <label>Rate Event (1 to 5) 💉 :</label>
              </div>
              <div className="rate">
                <input onClick={handleChange} type="radio" id="star5" name="rating" value="5" />
                <label htmlFor="star5" title="text">5</label>
                <input onClick={handleChange} type="radio" id="star4" name="rating" value="4" />
                <label htmlFor="star4" title="text">4</label>
                <input onClick={handleChange} type="radio" id="star3" name="rating" value="3" />
                <label htmlFor="star3" title="text">3</label>
                <input onClick={handleChange} type="radio" id="star2" name="rating" value="2" />
                <label htmlFor="star2" title="text">2</label>
                <input onClick={handleChange} type="radio" id="star1" name="rating" value="1" />
                <label htmlFor="star1" title="text">1</label>
              </div>
            </section>
            <section className="text-review">
              <div>
                <label>Write Your Review</label>
              </div>
              <textarea 
                name="text"
                placeholder="Tell us what you thought..."
                onChange={handleChange}
                value={formdata.text}
              />
              <button type="submit" className="submit-btn">Submit</button>
            </section>
          </form>
          : 
          
          <h2><Link to='/register'>Register</Link> or <Link to='/login'>Login</Link> to leave a review!</h2>
                
        }
        <div className="reviews-and-ratings-wrapper">
          <section className="reviews">
            {event && event.comments && event.comments.length > 0 ?
              <div>
                <h3>Reviews:</h3>
                {event.comments.map(comment => {
                  console.log(comment)
                  return (
                    <div key={comment._id} className="review">
                      <h5>{comment.owner.username}</h5>
                      <p><small>{comment.updatedAt}</small></p>
                      <p>{comment.text}</p>
                      <h5>{comment.rating} ⭐️</h5>
                    </div>
                  )
                }
                )}
              </div>
              :
              <div>
                <h3>Reviews:</h3>
                <p>Be the first to review this event!</p>
              </div>
            }
          </section>
          
          <section className="avgRating">
            <h3>Average Rating:</h3>
            {stars.length > 0 ?
              <div>{stars.map(star => star)}</div>
              :
              <div>Be the first to rate this event!</div>
            }
          </section>
        </div>
      </section>
    </main>
    
  )
}

export default EventShow