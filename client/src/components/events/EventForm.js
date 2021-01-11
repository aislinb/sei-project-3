import React from 'react'
import { getAllVenues } from '../../lib/api'

function EventForm({ handleChange, handleSubmit, formdata }) {
  const [venues, setVenues] = React.useState([])

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getAllVenues()
        setVenues(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <label className="block-form">Event Name</label>
      <input 
        className="block-form"
        type="text" 
        name="name"  
        placeholder="Event Name" 
        onChange={handleChange} 
        value={formdata.name}
      />
      <label className="block-form">Event Date</label>
      <input 
        className="block-form"
        type="date" 
        name="date"
        onChange={handleChange} 
        value={formdata.date}
      />
      <label className="block-form">Event Venue</label>
      <div className="side-note">
        <p>Don&apos;t see your venue on this list?</p>
        <button>Add Venue</button>
      </div>
      <select className="block-form"
        onChange={handleChange} 
        name="venue"
        value={formdata.venue}
      //Need to add a function onselect to add the entire venue object to the event object
      >
        {venues ?
          venues.map(venue => {
            return (
              <option key={venue._id} value={venue._id}>{venue.name}</option>
            )
          })
          :
          <option>No options available</option>
        }
      </select>
      <label className="block-form">Event Description</label>
      <textarea 
        className="block-form"
        name="description" 
        maxLength="400"
        placeholder="The Killers rocked the whole Isle of Wight as the closing act this year. Half the audience cried when they finally played Mr. Brightside." 
        onChange={handleChange} 
        value={formdata.description}
      />
      <label className="block-form">Image URL</label>
      <input 
        className="block-form"
        type="text" 
        name="eventImage" 
        placeholder="E.g. https://secure.i.telegraph.co.uk/multimedia/archive/02591/killers_2591613b.jpg" 
        onChange={handleChange} 
        value={formdata.image}
      />
      <button type="submit">Submit</button>
    </form>
  )
}

export default EventForm