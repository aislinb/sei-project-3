import React from 'react'
import { useParams } from 'react-router-dom'
import { getSingleEvent } from '../../lib/api'

function EventShow() {
  const [event, setEvent] = React.useState([])

  const { id } = useParams()

  React.useEffect(() => {

    const getData = async () => {
      try {
        const { data } = await getSingleEvent(id)
        setEvent(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [id])

  return (
    <main>
      <h1>Show Events here in more details</h1>
      <p>{event.name}</p>
      <br />
      <br />
      <br />
      <hr />
      <h5>Comments here</h5>
    </main>
    
  )
}

export default EventShow