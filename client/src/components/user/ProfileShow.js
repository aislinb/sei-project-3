import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { isAuthenticated } from '../../lib/auth'
import { showUserProfile } from '../../lib/api'

function profileShow() {
  const isLoggedIn = isAuthenticated()
  const [user, setUser] = React.useState('')

  const { id } = useParams()

  React.useEffect(() => {

    const getData = async () => {
      try {
        const { data } = await showUserProfile(id)
        setUser(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [id])
  console.log(user)

  // // De-structured fields from the event object
  // const { username, email } = user

  return (
    <main>
      {isLoggedIn ?
        <>
          <h1>Welcome, {user.username}!</h1>
          <div>
            <h1>Please click below to update your details:</h1>
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
            <h4>Profile Picture:</h4>
            {!user.userImage ? 
              <div>You have not added a profile image yet!</div>
              :
              <figure className="image">
                <img src={user.userImage} alt={user.name}/>
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
          <div className="field">
            <button type="submit" className="form-submit-button">
              <Link to={'/profile/update-profile'} className="edit-button">Edit my profile</Link>
            </button>
          </div>
        </>
        :
        <div className="submit-btn">
          <button type="submit" className="form-submit-button">
          Please <Link to="/login">Log in</Link> to access this page
          </button>
        </div>
      }
    </main>
    
  )
}

export default profileShow