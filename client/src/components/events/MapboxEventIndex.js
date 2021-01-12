import React from 'react'
import { Link } from 'react-router-dom'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'

import { getAllEvents } from '../../lib/api'

function eventsMapbox() {

  const [events, setEvents ] = React.useState(null)

  const [popup, setPopup] = React.useState(null)

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
              {...viewport}
              onClick={() => setPopup(null)}
              onViewportChange={viewport => setViewport(viewport)}
            >
              {events ?
                events.map(event => (
                  <Marker
                    key={event.id}
                    latitude={event.venue.latitude}
                    longitude={event.venue.longitude}
                  >
                    <span
                      role="img"
                      aria-label="map-marker"
                      onClick={() => setPopup(event.venue)}
                    >
                      🏟
                    </span>
                  </Marker>
                ))
                :
                <h2>Loading map...</h2>
              }
              {popup &&
          <Popup
            closeOnClick={true}
            // onClose={() => setPopup(null)}
            latitude={popup.latitude}
            longitude={popup.longitude}
          >
            <div>{popup.name}, {popup.city}</div>
            <div>{events.map(event => {
              if (event.venue.name === popup.name) {
                return <div>
                  <Link to={`/events/${event._id}`}>{event.name}</Link>
                </div>
              }
            })}
            </div>
          </Popup>
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