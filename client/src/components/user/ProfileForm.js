import React from 'react'
import ImageUploadField from './ImageUpload'

function ProfileForm({ formdata, errors, handleChange, handleSubmit, buttonText = 'Submit' }) {
  return (
    <main>
      <form className="profile-edit-form" onSubmit={handleSubmit}>
        <div className="field">
          <label className="block-form">Username</label>
          <div className="control">
            <input
              className="block-form"
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
              value={formdata.username}
            />
          </div>
          {errors.username && <p className="error-in-field">{errors.username}</p>}
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
          {errors.email && <p className="error-in-field">{errors.email}</p>}
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
          {errors.city && <p className="error-in-field">{errors.city}</p>}
        </div>
        <div className="field">
          <label className="block-form">Profile Image: (please wait for image to appear)</label>
          <ImageUploadField
            onChange={handleChange}
            labelText="Profile Image"
            name="userImage"
            value={formdata.userImage}
          />
        </div>
        {errors.userImage && <p className="error-in-field">{errors.userImage}</p>}
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
        {errors.userBio && <p className="error-in-field">{errors.userBio}</p>}
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
