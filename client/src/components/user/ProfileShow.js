import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { isAuthenticated } from '../../lib/auth'
import { showUserProfile } from '../../lib/api'
import { getAllEvents } from '../../lib/api'

function profileShow() {
  const isLoggedIn = isAuthenticated()
  const [user, setUser] = React.useState('')
  const [hasError, setHasError] = React.useState(false)

  const { id } = useParams()

  React.useEffect(() => {

    const getData = async () => {
      try {
        const { data } = await showUserProfile(id)
        setUser(data)
      } catch (err) {
        setHasError(true)
        console.log(hasError)
      }
    }
    getData()
  }, [id])
  console.log(user)

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

  // // De-structured fields from the event object
  // const { username, email } = user

  return (
    <main>
      {isLoggedIn ?
        <>
          <h1>Welcome, {user.username}!</h1>
          <div>
            <h3>Please click below to update your details:</h3>
          </div>
          <div>
            <h4>Username:</h4>
            <span>{user.username}</span>
          </div>
          <div>
            <h4>Email address:</h4>
            <p>{user.email}</p>
          </div>
          <div>
            <h4>City:</h4>
            <p>{user.city}</p>
          </div>
          <div>
            <h4>Profile Picture:</h4>
            {!user.userImage ? 
              <div>You have not added a profile image yet!</div>
              :
              <figure className="profile-image">
                <img src={user.userImage} alt={user.username}/>
              </figure>
            }
          </div>
          <div>
            <h4>About Me:</h4>
            {!user.userBio ? 
              <div>You have not added anything about yourself yet!</div>
              :
              <p>{user.userBio}</p>
            }
          </div>
          <div>
            <h4>Events you have created:</h4>
            {user && events ? 
              events.map(event => {
                if (event.owner._id === user._id) {
                  return <div><Link to={`/events/${event._id}`}>{event.name}</Link></div>
                }
              })
              :
              <div>No events created yet</div>
            }
          </div>
          <div className="field">
            <button>
              <Link to={'/update-profile'} className="edit-button">Edit my profile</Link>
            </button>
          </div>
        </>
        :
        <div>
          <button>
          Please <Link to="/login">Log in</Link> to access this page
          </button>
        </div>
      }
    </main>
    
  )
}

export default profileShow