import React from 'react'
import EventForm from './EventForm'
import useForm from '../../utils/useForm'
import { createEvent } from '../../lib/api'
import { useHistory } from 'react-router-dom'


function eventNew() {
  const history = useHistory()
  const { formdata, handleChange } = useForm({
    name: '', 
    // Get ISO formatted dated from user selection. need to restrict date to only 2020
    date: '0000-00-00', 
    description: '',
    eventImage: '',
    // ACTUAL venue OBJECT will go here, found by its mongo id
    venue: {}
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await createEvent(formdata)
      history.push(`/events/${data._id}`)
      // un-comment below to test data you are submitting
      //window.alert(`Submitting ${JSON.stringify(formdata, null, 2)}`)
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <main>
      <EventForm 
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formdata={formdata}
      />
    </main>
  )
}

export default eventNew