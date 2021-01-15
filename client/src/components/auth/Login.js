import React from 'react'
import { useHistory, Link } from 'react-router-dom'
import useForm from '../../utils/useForm'
import { loginUser } from '../../lib/api'
import { setToken } from '../../lib/auth'


function Login() {
  const history = useHistory()
  const [error, setError] = React.useState(false)
  const { formdata, handleChange } = useForm({
    email: '',
    password: ''
  })

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      const { data } = await loginUser(formdata)
      setToken(data.token)
      history.push('/events') //page to go to after logging in
      // window.location.reload()
    } catch (err) {
      setError(true)
    }
  }

  const handleFocus = () => {
    setError(false)
  }

  return (
    <main>
      <section className="section login-page">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="block-form">
            <h1>Login here</h1>
            <label className="block-form">Email:</label>
            <input
              className="block-form"
              placeholder="Email"
              onChange={handleChange}
              name="email"
              value={formdata.email}
              onFocus={handleFocus}
            />
          </div>
          <div className="field">
            <label className="block-form">Password:</label>
            <input
              type="password"
              className="block-form"
              placeholder="Password"
              onChange={handleChange}
              name="password"
              value={formdata.password}
              onFocus={handleFocus}
            />
            {error && <p className="error-in-form">Sorry, your username or password are incorrect</p>}
          </div>
          <div className="block-form">
            <button type="submit" className="block-form form-submit-button">Log In</button>
          </div>
          <div className="block-form">
            <p>or</p>
          </div>
          <Link to="/register">
            <div className="block-form">
              <button className="block-form">Create New Account</button>
            </div>
          </Link>
        </form>
      </section>
    </main>
  )
}

export default Login