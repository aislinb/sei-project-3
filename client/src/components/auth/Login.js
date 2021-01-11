import React from 'react'
import { useHistory } from 'react-router-dom'
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
    } catch (err) {
      setError(true)
    }
  }

  const handleFocus = () => {
    setError(false)
  }

  return (
    <main>
      <section className="section">
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="field">
            <label className="label">Email</label>
            <input
              className="input-field"
              placeholder="Email"
              onChange={handleChange}
              name="email"
              value={formdata.email}
              onFocus={handleFocus}
            />
          </div>
          <div className="field">
            <label className="label">Password</label>
            <input
              type="password"
              className="input-field"
              placeholder="Password"
              onChange={handleChange}
              name="password"
              value={formdata.password}
              onFocus={handleFocus}
            />
            {error && <p className="login-error">Sorry, your username or password are incorrect</p>}
          </div>
          <div className="field">
            <button type="submit" className="form-submit-button">Log In</button>
          </div>
        </form>
      </section>
    </main>
  )
}

export default Login