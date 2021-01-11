import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Nav from './components/common/Nav'
import Footer from './components/common/Footer'
import Home from './components/common/Home'
import Register from './components/auth/Register'
import EventIndex from './components/events/EventIndex'
import EventShow from './components/events/EventShow'
import VenueIndex from './components/venues/VenueIndex'
import VenueShow from './components/venues/VenueShow'
import Login from './components/auth/Login'

function App() {

  // axios get moved to api.js and EventIndex.js

  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/events/:id" component={EventShow} />
        <Route path="/events" component={EventIndex} />
        <Route path="/venues/:id" component={VenueShow} />
        <Route path="/venues" component={VenueIndex} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </Switch>
      <Footer />
    </BrowserRouter>
  )

}

export default App
