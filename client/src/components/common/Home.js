import React from 'react'
import { getAllEvents } from '../../lib/api'
import { Link } from 'react-router-dom'
import HeroCarousel from 'react-hero-carousel'

function Home() {

  const [events, setEvents] = React.useState([])

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getAllEvents()
        const filteredEvents = data.filter(event => {
          const topThree = event.avgRating > 4
          return topThree.slice[0, 2]
        })
        console.log(data)
        setEvents(filteredEvents)
      } catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])

  return (
    <>
      <main>
        <section className="hero">
          <HeroCarousel interval={3000}>
            <img
              src="https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fi1.wp.com%2Fwww.adobomagazine.com%2Fwp-content%2Fuploads%2F2020%2F01%2Fcoachella-hero2.jpg%3Ffit%3D1440%252C757%26ssl%3D1"

            />
            <img
              src="https://vanani.com/wp-content/uploads/2015/07/Tomorrowland-festival-HD-Wallpapers-7.jpg"
            />
            <img
              src="https://slack-imgs.com/?c=1&o1=ro&url=https%3A%2F%2Fstatic.dezeen.com%2Fuploads%2F2018%2F04%2Fphillip-k-smith-reflection-field-installation-coachella_dezeen_hero.jpg"
            />
          </HeroCarousel>
        </section>
        <h1>2020 Reimagined</h1>
        <p>Reimagining the events we missed in 2020 as if COVID were non-existent. In an alternate reality, thousands of people attended events across the world in 2020 living their best lives. Let us know what your 2020 self thought as you partied, supported and travelled to these incredible events.</p>
        <div>
          <h2>Highest Rated Events</h2>
          {events ?
            <ul className="index-list">
              <li>Glastonbury Festival</li>
              <li>Tokyo Summer Olympics 2020</li>
              <li>Burning Man</li>
              {events.map(item => {
                // De-structured fields from the event object
                const { _id, name, date, eventImage } = item
                // Convert ISO date into JS format date
                const jsDate = new Date(date)
                // Get the day of the month
                const day = jsDate.getDate()
                // Get the actual month - months begin at 0
                const month = jsDate.getMonth() + 1
                // Get the year
                const year = jsDate.getFullYear()
                return (
                  <li key={_id}>
                    <Link to={`/events/${_id}`}>
                      <h3>{name}</h3>
                      <h5>{day}/{month}/{year}</h5>
                      {item.venue ? 
                        <h6>{item.venue.name}, {item.venue.city}, {item.venue.country}</h6>
                        : 
                        <div>Loading events...</div>
                      }
                      {/* <p>{description}</p> */}
                      <figure>
                        <img src={eventImage} alt={name} />
                      </figure>
                    </Link>
                  </li>
                )
              })

              }
            </ul>
            :
            <div>Loading events...</div>
          }
        </div>
      </main>
    </>
  )
}

export default Home