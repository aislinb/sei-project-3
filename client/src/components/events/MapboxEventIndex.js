import React from 'react'


import ReactMapGL, { Marker } from 'react-map-gl'

import { getAllEvents } from '../../lib/api'

function eventsMapbox() {

  const [events, setEvents ] = React.useState(null)

  const [viewport, setViewport] = React.useState({
    latitude: 51.501476,
    longitude: -0.140634,
    zoom: 4
  })

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getAllEvents()
        console.log(data)
        setEvents(data)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  return (
    <main>
      <section>
        <div className="map-container">
          {viewport ? 
            <ReactMapGL
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
              height="100%"
              width="100%"
              mapStyle='mapbox://styles/mapbox/streets-v11'
              onViewportChange={viewport => setViewport(viewport)}
              {...viewport}
            >
              {events ?
                events.map(event => (
                  <Marker
                    key={event.id}
                    latitude={event.venue.latitude}
                    longitude={event.venue.longitude}
                  >
                    {/* <img src={event.eventImage} alt={event.name}/> */}
                    🏟
                  </Marker>
                ))
                :
                <h2>...loading</h2>
              }
            </ReactMapGL>
            : 
            <h1>Finding your location...</h1>
          }
        </div>
      </section>
    </main>
  )
}

export default eventsMapbox