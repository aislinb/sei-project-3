import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { deleteVenue, getSingleVenue, createVenueComment } from '../../lib/api'
import { isOwner, isAuthenticated } from '../../lib/auth'
import useForm from '../../utils/useForm'
import { Link } from 'react-router-dom'

function venueShow() {
  const [venue, setVenue] = React.useState([])

  const isLoggedIn = isAuthenticated()
  
  const { formdata, handleChange } = useForm({
    text: '', 
    rating: '',
    owner: {}
  })

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
      const { data } = await createVenueComment(formdata, venue._id)
      console.log(data)
      // window.alert(`Submitting ${JSON.stringify(formdata, null, 2)}`)
    } catch (err) {
      console.log(err)
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
          <button className="delete-btn" onClick={handleDelete}>Delete</button>
          :
          <div>Loading...</div>
        }
      </section>
      <hr />
      <section className="reviews">
        <h3>Review {venue.name}</h3>
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
        {venue && venue.comments ?
          <div>
            <h1>Reviews:</h1>
            {venue.comments.map(comment => {
              return (
                <div key={comment._id}>
                  <h3>{comment.owner.username}</h3>
                  <h5>{comment.text}</h5>
                  <h5>{comment.rating} ⭐️</h5>
                </div>
              )
            }
            )}
          </div>
          :
          <h6>No comments</h6>
        }
      </section>
    </main>
    
  )
}

export default venueShow