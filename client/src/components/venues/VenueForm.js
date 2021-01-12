import React from 'react'

function VenueForm({ handleChange, handleSubmit, formdata }) {

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h1>Add a New Venue</h1>
      <label className="block-form">Venue Name</label>
      <input 
        className="block-form"
        type="text" 
        name="name"  
        placeholder="Venue Name" 
        onChange={handleChange} 
        value={formdata.name}
      />
      <label className="block-form">Venue City</label>
      <input 
        className="block-form"
        type="text" 
        name="city"  
        placeholder="Venue City" 
        onChange={handleChange} 
        value={formdata.city}
      />
      <label className="block-form">Venue Country</label>
      <input 
        className="block-form"
        type="text" 
        name="country"  
        placeholder="Venue Country" 
        onChange={handleChange} 
        value={formdata.country}
      />
      <label className="block-form">Venue Continent</label>
      <input 
        className="block-form"
        type="text" 
        name="continent"  
        placeholder="Venue Continent" 
        onChange={handleChange} 
        value={formdata.continent}
      />
      <label className="block-form">Image URL</label>
      <input 
        className="block-form"
        type="text" 
        name="venueImage" 
        placeholder="E.g. https://www.wembleystadium.com/-/media/Project/WembleyStadium/venue-hire/wembley-stadium-seating_800.ashx" 
        onChange={handleChange} 
        value={formdata.venueImage}
      />
      <label className="block-form">Latitude</label>
      <input 
        className="block-form"
        type="text" 
        name="latitude" 
        placeholder="E.g. 51.5014" 
        onChange={handleChange} 
        value={formdata.latitude}
      />
      <label className="block-form">Longitude</label>
      <input 
        className="block-form"
        type="text" 
        name="longitude" 
        placeholder="E.g. 0.1419" 
        onChange={handleChange} 
        value={formdata.longitude}
      />
      <button type="submit" className="submit-btn">Submit</button>
    </form>
  )
}

export default VenueForm