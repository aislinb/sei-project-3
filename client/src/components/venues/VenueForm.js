import React from 'react'

function VenueForm({ handleChange, handleSubmit, formdata }) {

  return (
    <form className="add-form" onSubmit={handleSubmit}>
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
        name="name"  
        placeholder="Venue City" 
        onChange={handleChange} 
        value={formdata.city}
      />
      <label className="block-form">Venue Country</label>
      <input 
        className="block-form"
        type="text" 
        name="name"  
        placeholder="Venue Country" 
        onChange={handleChange} 
        value={formdata.country}
      />
      <label className="block-form">Venue Continent</label>
      <input 
        className="block-form"
        type="text" 
        name="name"  
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
        value={formdata.image}
      />
      <button type="submit">Submit</button>
    </form>
  )
}

export default VenueForm