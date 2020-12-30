import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import './styles/style.css'


import Add from './components/Add'
import Flights from './components/Flights'
import Hotels from './components/Hotels'
import CarHire from './components/CarHire'
import Map from './components/Map'
import Login from './components/Login'
import Navbar from './components/Navbar'
import SignUp from './components/SignUp'
import Account from './components/Account'
import UpdateAccount from './components/UpdateAccount'
import Chat from './components/Chat'


const App = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>

      <Route exact path="/" component={Login} />
      <Route exact path="/map" component={Map} />
      <Route exact path="/signup" component={SignUp} />
      <Route exact path="/add" component={Add} />
      <Route exact path="/flights" component={Flights} />
      <Route exact path="/hotels" component={Hotels} />
      <Route exact path="/carhire" component={CarHire} />
      <Route exact path="/users/:id" component={Account} />
      <Route exact path="/users/:id/edit" component={UpdateAccount} />
      <Route exact path="/users/:id/chat" component={Chat} />
     

    </Switch> 
  </BrowserRouter>
)

export default App