import React from 'react'

function Register() {
  return (
    <main>
      <h1>Register here</h1>
      <form>
        <div>
          <label>Username</label>
        </div>
        <div>
          <input type="text" placeholder="Username"/>
        </div>
        <br />
        <div>
          <label>Email</label>
        </div>
        <div>
          <input  type="text" placeholder="Email"/>
        </div>
        <br />
        <div>
          <label>Password</label>
        </div>
        <div>
          <input  type="password" placeholder="Password"/>
        </div>
        <br />
        <div>
          <label>Password Confirmation</label>
        </div>
        <div>
          <input  type="password" placeholder="Password Confirmation"/>
        </div>
      </form>
    </main>
  )
}

export default Register