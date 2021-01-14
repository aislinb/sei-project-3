import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Nav from './components/common/Nav'
import Footer from './components/common/Footer'
import Home from './components/common/Home'
import Register from './components/auth/Register'
import EventIndex from './components/events/EventIndex'
import EventShow from './components/events/EventShow'
import EventNew from './components/events/EventNew'
import EventEdit from './components/events/EventEdit'
import VenueIndex from './components/venues/VenueIndex'
import VenueShow from './components/venues/VenueShow'
import ProfileShow from './components/user/ProfileShow'
import ProfileEditCard from './components/user/ProfileEditCard'
import VenueNew from './components/venues/VenueNew'
import VenueEdit from './components/venues/VenueEdit'
import Login from './components/auth/Login'
import eventsMapbox from './components/events/MapboxEventIndex'

function App() {

  // axios get moved to api.js and EventIndex.js

  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/events/new" component={EventNew} />
        <Route path="/venues/new" component={VenueNew} />
        <Route path="/events/:id/edit" component={EventEdit} />
        <Route path="/events/:id" component={EventShow} />
        <Route path="/events" component={EventIndex} />
        <Route path="/venues/:id/edit" component={VenueEdit} />
        <Route path="/venues/:id" component={VenueShow} />
        <Route path="/venues" component={VenueIndex} />
        <Route path="/map" component={eventsMapbox} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/update-profile" component={ProfileEditCard} />
        <Route path="/profile" component={ProfileShow} />
      </Switch>
      <Footer />
    </BrowserRouter>
  )

}

export default App
