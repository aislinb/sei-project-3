import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Nav from './components/common/Nav'
import Home from './components/common/Home'
import Register from './components/auth/Register'
import EventIndex from './components/events/EventIndex'
import EventShow from './components/events/EventShow'

function App() {

  // axios get moved to api.js and EventIndex.js

  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route exact path="/" component={Home}/>
        <Route path="/events/:id" component={EventShow} />
        <Route path="/events" component={EventIndex} />
        <Route path="/register" component={Register} />
      </Switch>
    </BrowserRouter>
  )

}

export default App
