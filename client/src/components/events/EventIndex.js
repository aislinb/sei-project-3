import React from 'react'
import { getAllEvents } from '../../lib/api'
import { Link } from 'react-router-dom'
import RingLoader from 'react-spinners/RingLoader'
import Select from 'react-select'


function EventIndex() {
  const [events, setEvents] = React.useState([])
  const [hasError, setHasError] = React.useState(false)

  let continents = []
  let countries = []
  let cities = []

  events.map(event => {
    continents.push(event.venue.continent)
    countries.push(event.venue.country)
    cities.push(event.venue.city)
  })

  function removeDuplicates(data) {
    const unique = []
    data.forEach(element => {
      if (!unique.includes(element)) {
        unique.push(element)
      }
    })
    return unique
  }
  continents = removeDuplicates(continents)
  countries = removeDuplicates(countries)
  cities = removeDuplicates(cities)

  const filteredContinents = []
  continents.map(continent => {
    filteredContinents.push({ value: continent, label: continent })
  })

  const filteredCountries = []
  countries.map(country => {
    filteredCountries.push({ value: country, label: country })
  })

  const filteredCities = []
  cities.map(city => {
    filteredCities.push({ value: city, label: city })
  })

  const handleSelectContinent = (e) => {
    const results = events.filter(event => {
      return event.venue.continent === e.value
    })
    setEvents(results)
  }
  //This function only works once

  const handleSelectCountry = (e) => {
    const results = events.filter(event => {
      return event.venue.country === e.value
    })
    setEvents(results)
  }

  const handleSelectCity = (e) => {
    const results = events.filter(event => {
      return event.venue.city === e.value
    })
    setEvents(results)
  }

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getAllEvents()
        setEvents(data)

      } catch (err) {
        console.log(err)
        setHasError(true)
      }
    }
    getData()
  }, [])

  // sorting events into alphabetical order
  function compare( a, b ) {
    if ( a.name < b.name ){
      return -1
    }
    if ( a.name > b.name ){
      return 1
    }
    return 0
  }
  events.sort( compare )

  const reloadPage = () => {
    window.location.reload()
  }
  

  
  return (
    <main>
      <div className="index-header">
        <h1>Highlights of 2020</h1>
        <button>
          <Link to="/map">Map View</Link>
        </button>
        <button>
          <Link to="/events/new">Add Event</Link>
        </button>
        <button onClick={reloadPage}>
          <Link to="/events/">Reset Selection</Link>
        </button>
      </div>
      <div className="selects">
        <h2>Continent:</h2>
        <Select 
          options={filteredContinents}
          onChange={handleSelectContinent}
          placeholder="Select a continent..."
        />
        <h2>Country:</h2>
        {countries.length > 0 ?
          <Select 
            options={filteredCountries}
            onChange={handleSelectCountry}
            placeholder="Select a country..."
          />
          :
          <Select />
        }
        <h2>City:</h2>
        {cities.length > 0 ?
          <Select 
            options={filteredCities}
            onChange={handleSelectCity}
            placeholder="Select a city..."
          />
          :
          <Select />
        }
      </div>
      <br />
      {events ?
        <ul className="index-list">
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
        <div>
          {hasError ? 'Oops something went wrong...'
            :
            <div className="ring-loader">
              <RingLoader color="purple" size={60} />
            </div>
          }
        </div>
      }
    </main>
  )
}

export default EventIndex