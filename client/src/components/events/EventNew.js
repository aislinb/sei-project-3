import React from 'react'
import EventForm from './EventForm'
import useForm from '../../utils/useForm'
import { createEvent } from '../../lib/api'
import { useHistory } from 'react-router-dom'


function eventNew() {
  const history = useHistory()
  const { formdata, handleChange, errors, setErrors } = useForm({
    name: '', 
    // Get ISO formatted dated from user selection. need to restrict date to only 2020
    date: '', 
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
      setErrors(err.response.data.errors)
    }
  }


  return (
    <main>
      <h1 className="form-heading">Add a <span className="year-2020">2020</span> Event</h1>
      <EventForm 
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formdata={formdata}
        errors={errors}
      />
    </main>
  )
}

export default eventNew