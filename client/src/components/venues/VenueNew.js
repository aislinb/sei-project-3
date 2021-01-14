import React from 'react'
import VenueForm from './VenueForm'
import useForm from '../../utils/useForm'
import { createVenue } from '../../lib/api'
import { useHistory } from 'react-router-dom'


function eventNew() {
  const history = useHistory()
  const { formdata, handleChange, errors, setErrors } = useForm({
    name: '', 
    city: '', 
    country: '', 
    continent: '', 
    venueImage: ''
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await createVenue(formdata)
      history.push(`/venues/${data._id}`)
      // un-comment below to test data you are submitting
      //window.alert(`Submitting ${JSON.stringify(formdata, null, 2)}`)
    } catch (err) {
      setErrors(err.response.data.errors)
    }
  }


  return (
    <main>
      <h1 className="form-heading">Add a New Venue</h1>
      <VenueForm 
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        formdata={formdata}
        errors={errors}
      />
    </main>
  )
}

export default eventNew