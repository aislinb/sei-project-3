import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { deleteVenue, getSingleVenue, createVenueComment, getAllEvents } from '../../lib/api'
import { isOwner, isAuthenticated } from '../../lib/auth'
import useForm from '../../utils/useForm'
import { Link } from 'react-router-dom'
import RingLoader from 'react-spinners/RingLoader'
import profilePlaceholder from '../../images/profile-placeholder.jpg'

function venueShow() {
  const [venue, setVenue] = React.useState([])

  const isLoggedIn = isAuthenticated()
  
  // Tried to add error handling to review form, but no luck - PJ
  const { formdata, handleChange, errors, setErrors  } = useForm({
    text: '', 
    rating: '',
    owner: {}
  })

  const stars = []

  for (let i = 0; i < venue.avgRating; i++) {
    stars.push('★')
  }

  const history = useHistory()
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

  // GET EVENTS:
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
  

  // AB - also having issues with adding events taking place at the venue

  // ! DELETE Function
  const handleDelete = async () => {
    try {
      await deleteVenue(id)
      history.push('/venues')
    } catch (err) {
      console.log(err)
    }
  }

  // * Submit Reviews
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createVenueComment(formdata, venue._id)
      const { data } = await getSingleVenue(id)
      setVenue(data)
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
        <h5>{city}, {country}</h5>
        <figure>
          <img src={venueImage} alt={name} />
        </figure>
        {venue.owner && venue ?
          isOwner(venue.owner._id) && 
          <div>
            <Link to={`${venue._id}/edit`}><button className="edit-btn">Edit</button></Link>
            <button className="delete-btn" onClick={handleDelete}>Delete</button>
          </div>
          :
          <div className="ring-loader">
            <RingLoader color="purple" size={60} />
          </div>
        }
      </section>
      <h4>Events at this venue:</h4>
      <section className="events-at-this-venue">
        {venue && events ? 
          events.map(event => {
            const { _id, name, date, eventImage } = event
            // Convert ISO date into JS format date
            const jsDate = new Date(date)
            // Get the day of the month
            const day = jsDate.getDate()
            // Get the actual month - months begin at 0
            const month = jsDate.getMonth() + 1
            // Get the year
            const year = jsDate.getFullYear()
            if (event.venue.name === venue.name) {
              return (
                <div className="event-preview">
                  <Link to={`/events/${_id}`}>
                    <h5>{name}</h5>
                    <p>{day}/{month}/{year}</p>
                    <figure>
                      <img src={eventImage} alt={name} />
                    </figure>
                  </Link>
                </div>
              )
            }
          })
          :
          <div>No events at this venue.</div>
        }
      </section>
      <hr />
      <section className="add-review">
        <h3>Review {venue.name}</h3>
        {isLoggedIn ? 
          <form onSubmit={handleSubmit}>
            <section className="rate-event">
              <div>
                <label>Rate This Venue (1 to 5):</label>
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
              {errors ? 
                <div>
                  {errors.rating && <p className="error-message">{errors.rating}</p>}
                </div>
                :
                <div></div>
              }
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
              {errors ? 
                <div>
                  {errors.text && <p className="error-message">{errors.text}</p>}
                </div>
                :
                <div></div>
              }
              <button type="submit" className="submit-btn">Submit</button>
            </section>
          </form>
          : 
          <h2><Link to='/register'>Register</Link> or <Link to='/login'>Login</Link> to leave a review!</h2>   
        }
        <div className="reviews-and-ratings-wrapper">
          <section className="reviews">
            {venue && venue.comments && venue.comments.length > 0 ?
              <div>
                <h3>Reviews:</h3>
                {venue.comments.map(comment => {
                  return (
                    <div key={comment._id} className="review">
                      <h3>{comment.owner.username}</h3>
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

export default venueShow