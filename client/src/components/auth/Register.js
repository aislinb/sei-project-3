import React from 'react'
import useForm from '../../utils/useForm'
import { registerUser } from '../../lib/api'
import { useHistory } from 'react-router-dom'

function Register() {
  const history = useHistory()
  const { formdata, errors, handleChange, setErrors } = useForm({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: ''
  })

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      await registerUser(formdata)
      history.push('/login') // is registration successful => login
    } catch (err) {
      setErrors(err.response.data.errors)
    }
  }
  return (
    <main>
      <h1>Register here</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Username</label>
          <input
            className="input-field"
            placeholder="Username"
            onChange={handleChange}
            name="username"
            value={formdata.username}
          />
        </div>
        <div className="field">
          <label className="label">Email</label>
          <input
            className="input-field"
            placeholder="Email"
            onChange={handleChange}
            name="email"
            value={formdata.email}
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
          />
        </div>
        {errors.password && <p className="error-in-form">{errors.password}</p>}
        <div className="field">
          <label className="label">Password Confirmation</label>
          <div className="control">
            <input
              type="password"
              className={`input ${errors.passwordConfirmation ? 'error-in-form' : ''}`}
              placeholder="Password Confirmation"
              onChange={handleChange}
              name="passwordConfirmation"
              value={formdata.passwordConfirmation}
            />
          </div>
          {errors.passwordConfirmation && <p className="error-in-form">{errors.passwordConfirmation}</p>}
        </div>
        <div className="field">
          <button type="submit" className="form-submit-button">Log In</button>
        </div>
      </form>
    </main>
  )
}

export default Register