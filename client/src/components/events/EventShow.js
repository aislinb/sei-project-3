import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { deleteEventComment, getSingleEvent, createEventComment } from '../../lib/api'
import { isOwner } from '../../lib/auth'
import useForm from '../../utils/useForm'
import { isAuthenticated } from '../../lib/auth'
import { Link } from 'react-router-dom'
import RingLoader from 'react-spinners/RingLoader'
import profilePlaceholder from '../../images/profile-placeholder.jpg'

function EventShow() {
  const [event, setEvent] = React.useState([])
  
  const isLoggedIn = isAuthenticated()

  const { formdata, handleChange, errors, setErrors } = useForm({
    text: '', 
    rating: '',
    owner: {}
  })

  const stars = []

  for (let i = 0; i < event.avgRating; i++) {
    stars.push('★')
  }

  const history = useHistory()
  const { id, commentId } = useParams()

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
  }, [id, commentId])

  // De-structured fields from the event object
  const { name, date, description, eventImage } = event

  // Convert event ISO date into JS format date
  const jsDate = new Date(date)
  // Get the day of the month
  const day = jsDate.getDate()
  // Get the actual month - months begin at 0
  let month = jsDate.getMonth()
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  month = months[month]
  // Get the year
  const year = jsDate.getFullYear()

  // ! DELETE Function
  const handleDelete = async () => {
    try {
      await deleteEventComment(id, commentId)
      history.push(`/events/${id}`)
    } catch (err) {
      console.log(err)
    }
  }

  // * Submit Reviews
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createEventComment(formdata, event._id)
      const { data } = await getSingleEvent(id)
      setEvent(data)
      formdata.text = ''
      e.target[5].value = ''
      // window.location.reload() <-- Don't use this in React
      // window.alert(`Submitting ${JSON.stringify(formdata, null, 2)}`)
    } catch (err) {
      setErrors(err.response.data.errors)
    }
  }



  return (
    <main>
      <section className="event-detail">
        <h1>{name}</h1>
        <h5>{day} {month} {year}</h5>
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
          <div>
            <Link to={`${event._id}/edit`}><button className="edit-btn">Edit</button></Link>
            <button className="delete-btn" onClick={handleDelete}>Delete</button>
          </div>
          :
          <div className="ring-loader">
            <RingLoader color="purple" size={60} />
          </div>
        }
      </section>
      <hr />

      <section className="add-review">
        <h3>Review {event.name}</h3>
        {isLoggedIn ? 
          <form onSubmit={handleSubmit}>
            <section className="rate-event">
              <div>
                <label>Rate Event (1 to 5):</label>
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
              {errors.rating && <p className="error-in-form error-message">{errors.rating}</p>}
            </section>
            <section className="text-review">
              <div>
                <label>Write Your Review</label>
              </div>
              <textarea
                className="block-form" {...`input ${errors.text ? 'error-in-form' : ''}`}
                name="text"
                placeholder="Tell us what you thought..."
                onChange={handleChange}
                value={formdata.text}
              />
              {errors.text && <p className="error-in-form error-message">{errors.text}</p>}
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
                  return (
                    <div key={comment._id} className="review">
                      <h5>{comment.owner.username}</h5>
                      <div className="avatar">
                        {comment.owner.userImage ? 
                          <img src={comment.owner.userImage} alt="profile pic" />
                          :
                          <img src={profilePlaceholder} alt="profile pic" />
                        }
                      </div>
                      <p><small>Reviewed {comment.updatedAt.slice(0, 10)}</small></p>
                      <p>{comment.text}</p>
                      <h5>{comment.rating} ⭐️</h5>
                      <button className="delete-btn" onClick={handleDelete}>Delete</button>
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