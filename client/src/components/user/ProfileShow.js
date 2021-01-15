import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { isAuthenticated } from '../../lib/auth'
import { showUserProfile, getAllEvents  } from '../../lib/api'

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

  return (
    <main className="profile-show">
      {isLoggedIn ?
        <>
          <div className="profile-container block-form">
            <h1>Welcome, {user.username}!</h1>
            <div className="block-form top-half">
              <div className="block-form half-width left">
                <div className="block-form half-width left">
                  <h4>Username:</h4>
                  <span>{user.username}</span>
                </div>
                <div className="block-form half-width left">
                  <h4>Email address:</h4>
                  <p>{user.email}</p>
                </div>
                <div className="block-form half-width left">
                  <h4>City:</h4>
                  <p>{user.city}</p>
                </div>
              </div>
              <div className="block-form  half-width right">
                <h4>Profile Picture:</h4>
                {!user.userImage ? 
                  <div className="profile-image not-yet">Not yet added...</div>
                  :
                  <figure className="profile-image">
                    <img src={user.userImage} alt={user.username}/>
                  </figure>
                }
              </div>
            </div>
            <div className="block-form bottom-half">
              <div className="block-form full-width">
                <h4>About Me:</h4>
                {!user.userBio ? 
                  <div>You have not added anything about yourself yet!</div>
                  :
                  <p>{user.userBio}</p>
                }
              </div>
              <div className="block-form full-width">
                <h4>Events you have created:</h4>
                {user && events ? 
                  events.map(event => {
                    if (event.owner._id === user._id) {
                      return (
                        <>
                          <div><Link to={`/events/${event._id}`}>{event.name}</Link></div>
                          <img src={event.eventImage} alt={event.name}/>
                        </>
                      )
                    }
                  })
                  :
                  <div>No events created yet</div>
                }
              </div>
              <div className="block-form full-width">
                <button className="edit-btn">
                  <Link to={'/update-profile'} className="edit-button">Edit my profile</Link>
                </button>
              </div>
            </div>
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