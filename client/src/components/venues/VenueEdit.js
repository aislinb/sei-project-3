import React from 'react'
import { getSingleVenue, editVenue } from '../../lib/api'
import { useParams, useHistory } from 'react-router-dom'


import VenueForm from './VenueForm'
import useForm from '../../utils/useForm'

function VenueEdit() {
  const { id } = useParams()
  const history = useHistory()

  const { formdata, setFormdata, handleChange, setErrors } = useForm({
    name: '', 
    city: '', 
    country: '', 
    continent: '', 
    venueImage: ''
  })

  React.useEffect(() => {
    const getData = async () => {
      const { data } = await getSingleVenue(id)
      setFormdata(data)
    } 
    getData()
  }, [id, setFormdata])
  
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      await editVenue(id, formdata)
      history.push(`/venues/${id}`)
    } catch (err) {
      setErrors(err.response.data.errors)
    }
  }
    
  return (
    <main>
      <h1 className="form-heading">Edit Venue</h1>
      <VenueForm 
        formdata={formdata}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </main>
    
  )
}

export default VenueEdit