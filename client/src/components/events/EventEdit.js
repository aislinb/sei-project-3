import React from 'react'
import { getSingleEvent, editEvent } from '../../lib/api'
import { useParams, useHistory } from 'react-router-dom'


import EventForm from './EventForm'
import useForm from '../../utils/useForm'

function EventEdit() {
  const { id } = useParams()
  const history = useHistory()

  const { formdata, setFormdata, handleChange } = useForm({
    name: '', 
    date: '', 
    description: '',
    eventImage: '',
    venue: {}
  })

  React.useEffect(() => {
    const getData = async () => {
      const { data } = await getSingleEvent(id)
      setFormdata(data)
    }
    getData()
  }, [id, setFormdata])
  
  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      await editEvent(id, formdata)
      history.push(`/events/${id}`)
    } catch (err) {
      console.log(err)
    }
  }
    
  return (
    <main>
      <h1>Edit Event</h1>
      <EventForm 
        formdata={formdata}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </main>
    
  )
}

export default EventEdit