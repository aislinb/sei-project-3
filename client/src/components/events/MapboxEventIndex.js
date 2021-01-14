import React from 'react'
import { Link } from 'react-router-dom'
import ReactMapGL, { Marker, Popup } from 'react-map-gl'

import { getAllEvents } from '../../lib/api'

import RingLoader from 'react-spinners/RingLoader'

function eventsMapbox() {

  const [events, setEvents ] = React.useState(null)

  const [popup, setPopup] = React.useState(null)
  

  
  // const [viewport, setViewport] = React.useState(null)

  const [viewport, setViewport] = React.useState({
    latitude: 51.501476,
    longitude: -0.140634,
    zoom: 4
  })

  // React.useEffect(() => {
  //   window.navigator.geolocation.getCurrentPosition(position => {
  //     const { coords: { latitude, longitude } } = position
  //     setViewport({ latitude, longitude })
  //   })
  // }, [])

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
      <h1>View Events by Location</h1>
      <h4>Click on the icon to reveal the event(s) at this venue:</h4>
      <section>
        <div className="map-container">
          {viewport ? 
            <ReactMapGL
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
              height="100%"
              width="100%"
              mapStyle='mapbox://styles/mapbox/streets-v11'
              // latitude={viewport.latitude}
              // longitude={viewport.longitude}
              {...viewport}
              // zoom={4}
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
                <div className="ring-loader">
                  <RingLoader color="purple" size={60} />
                </div>
              }
              {popup &&
          <Popup
            closeOnClick={true}
            latitude={popup.latitude}
            longitude={popup.longitude}
            closeButton={false}
          >
            <h4>{popup.name}, {popup.city}</h4>
            <h4>Events:</h4>
            <div>{events.map(event => {
              if (event.venue.name === popup.name) {
                return <p>
                  <Link to={`/events/${event._id}`}>{event.name}</Link>
                </p>
              }
            })}
            </div>
          </Popup>
              }
            </ReactMapGL>
            : 
            <div className="ring-loader">
              <RingLoader color="purple" size={60} />
            </div>
          }
        </div>
      </section>
    </main>
  )
}

export default eventsMapbox