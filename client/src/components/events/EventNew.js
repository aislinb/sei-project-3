import React from 'react'
import EventForm from './EventForm'
import useForm from '../../utils/useForm'
import { createEvent } from '../../lib/api'


function eventNew() {
  const { formdata, handleChange } = useForm({
    name: '', 
    // This is how the input type=date will return the date. Is this correct ISO format needed?
    date: '0000-00-00', 
    description: '',
    eventImage: '',
    // ACTUAL venue OBJECT will go here
    venue: {}
  })

  // PJ finish writing this function
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      // Use the SAME function that we used to add the owner to the new films we created
      const { data } = await createEvent(formdata)
      window.alert(`Submitting ${JSON.stringify(formdata, null, 2)}`)
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <main>
      <h1>Add a 2020 Event</h1>
      <EventForm 
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formdata={formdata}
      />
    </main>
  )
}

export default eventNew