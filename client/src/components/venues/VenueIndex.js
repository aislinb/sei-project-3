import React from 'react'
import { getAllVenues } from '../../lib/api'
import { Link } from 'react-router-dom'
import RingLoader from 'react-spinners/RingLoader'
import Select from 'react-select'

function venueIndex() {
  const [venues, setVenues] = React.useState([])
  const [hasError, setHasError] = React.useState(false)

  let continents = []
  let countries = []
  let cities = []

  venues.map(venue => {
    continents.push(venue.continent)
    countries.push(venue.country)
    cities.push(venue.city)
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
    const results = venues.filter(venue => {
      return venue.continent === e.value
    })
    setVenues(results)
  }
  //This function only works once

  const handleSelectCountry = (e) => {
    const results = venues.filter(venue => {
      return venue.country === e.value
    })
    setVenues(results)
  }

  const handleSelectCity = (e) => {
    const results = venues.filter(venue => {
      return venue.city === e.value
    })
    setVenues(results)
  }

  React.useEffect(() => {
    const getData = async () => {
      try {
        const { data } = await getAllVenues()
        setVenues(data)
      } catch (err) {
        console.log(err)
        setHasError(true)
      }
    }
    getData()
  }, [])

  function compare( a, b ) {
    if ( a.name < b.name ){
      return -1
    }
    if ( a.name > b.name ){
      return 1
    }
    return 0
  }
  venues.sort( compare )
  
  return (
    <main>
      <div className="index-header">
        <h1>Browse Venues</h1>
        <button>
          <Link to="/map">Map View</Link>
        </button>
        <button>
          <Link to="/venues/new">Add Venue</Link>
        </button>
      </div>
      <div className="selects">
        <Select 
          options={filteredContinents}
          onChange={handleSelectContinent}
          placeholder="Select a continent..."
        />
        {countries.length > 0 ?
          <Select 
            options={filteredCountries}
            onChange={handleSelectCountry}
            placeholder="Select a country..."
          />
          :
          <Select />
        }
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
      {venues ?
        <ul className="index-list">
          {venues.map(item => {
          // De-structured fields from the event object
            const { _id, name, city, country, venueImage } = item
            return (
              <li key={_id}>
                <Link to={`/venues/${_id}`}>
                  <h3>{name}</h3>
                  <h5>{city}, {country}</h5>
                  <figure>
                    <img src={venueImage} alt={name} />
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

export default venueIndex