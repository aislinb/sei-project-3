import React from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
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
          <h1>Welcome, {user.username}</h1>
          <div>
            <h1>this is the users profile page when they are logged in</h1>
            <form className="profile-page-form">
              <div className="field">
                <label className="label">Username</label>
                <input
                  className="input-field"
                  placeholder="Username"
                  name="username"
                />
              </div>
              <div className="field">
                <label className="label">Email: {user.email}</label>
                <input
                  className="input-field"
                  placeholder="Email"
                  name="email"
                />
              </div>
              <div className="field">
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input-field"
                  placeholder="Password"
                  name="password"
                />
              </div>
              <div className="field">
                <label className="label">Password Confirmation</label>
                <div className="control">
                  <input
                    type="password"
                    placeholder="Password Confirmation"
                    name="passwordConfirmation"
                  />
                </div>
              </div>
            </form>
          </div>
        </>
        :
        <div>
        You must visit the <Link to="/login">Log in</Link> page first
        </div>
      }
    </main>
    
  )
}

export default profileShow