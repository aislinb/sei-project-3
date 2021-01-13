import React from 'react'

function ProfileForm({ formdata, errors, handleChange, handleSubmit, buttonText = 'Submit' }) {
  return (
    <main>
      <form className="profile-edit-form" onSubmit={handleSubmit}>
        <div className="field">
          <label className="block-form">Name</label>
          <div className="control">
            <input
              className="block-form"
              type="text"
              placeholder="Name"
              name="username"
              onChange={handleChange}
              value={formdata.username}
            />
          </div>
          {errors.name && <p className="error-in-field">{errors.name}</p>}
        </div>
        <div className="field">
          <label className="block-form">Email</label>
          <div className="control">
            <input
              className="block-form"
              placeholder="Email"
              type="text"
              name="email"
              onChange={handleChange}
              value={formdata.email}
            />
          </div>
          {errors.name && <p className="error-in-field">{errors.name}</p>}
        </div>
        <div className="field">
          <label className="block-form">City</label>
          <div className="control">
            <input
              className="block-form"
              placeholder="City"
              type="text"
              name="city"
              onChange={handleChange}
              value={formdata.city}
            />
          </div>
          {errors.name && <p className="error-in-field">{errors.name}</p>}
        </div>
        <div className="field">
          <label className="block-form">Profile Image:</label>
          <input
            className="block-form"
            placeholder="Enter URL here"
            type="text"
            name="userImage"
            onChange={handleChange}
            value={formdata.userImage}
          />
        </div>
        <div className="field">
          <label className="block-form">About Me:</label>
          <input
            className="block-form"
            placeholder="Tell us about yourself..."
            type="text"
            name="userBio"
            onChange={handleChange}
            value={formdata.userBio}
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
