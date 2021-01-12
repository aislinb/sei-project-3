import React from 'react'

function ProfileForm({ formdata, errors, handleChange, handleSubmit, buttonText = 'Submit' }) {
  return (
    <main>
      <form className="profile-page-form" onSubmit={handleSubmit}>
        <div className="field">
          <label className="label">Name</label>
          <div className="control">
            <input
              className="input-field"
              placeholder="Name"
              name="username"
              onChange={handleChange}
              value={formdata.name}
            />
          </div>
          {errors.name && <p className="error-in-field">{errors.name}</p>}
        </div>
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              className="input-field"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              value={formdata.email}
            />
          </div>
          {errors.name && <p className="error-in-field">{errors.name}</p>}
        </div>
        <div className="field">
          <label className="label">City</label>
          <div className="control">
            <input
              className="input-field"
              placeholder="City"
              name="city"
              onChange={handleChange}
              value={formdata.city}
            />
          </div>
          {errors.name && <p className="error-in-field">{errors.name}</p>}
        </div>
        <div className="field">
          <label className="label">Profile Image:</label>
          <input
            className="input-field"
            placeholder="Enter URL here"
            name="userImage"
          />
        </div>
        <div className="field">
          <label className="label">About Me:</label>
          <input
            className="user-bio-field"
            placeholder="Tell us about yourself..."
            name="userBio"
          />
        </div>
        <div className="field">
          <button type="submit" className="submit-button">{buttonText}</button>
        </div>
      </form>
    </main>
    
  )
  // username: { type: String, required: true, unique: true, maxlength: 20}, 
  // email: { type: String, required: true, unique: true }, 
  // password: { type: String, required: true },
  // city: { type: String, required: false },
  // userImage: { type: String, required: false },
  // userBio: { type: String, required: false, maxlength: 400 },
  // events: [{ type: mongoose.Schema.ObjectId, ref: 'Event', required: false }]

}

export default ProfileForm
