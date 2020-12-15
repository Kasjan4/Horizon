import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'


// import './bootstrap/dist/css/bootstrap.min.css'
import './styles/style.css'


import Home from './components/Home'
import Login from './components/Login'
import Navbar from './components/Navbar'
import SignUp from './components/SignUp'
import SingleAccount from './components/SingleAccount'
import UpdateAccount from './components/UpdateAccount'
import UpdateAboutMe from './components/UpdateAboutMe'


const App = () => (
  <BrowserRouter>
    <Navbar />
    <Switch>

      <Route exact path="/" component={Home} />
      <Route exact path="/joinus" component={SignUp} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/users/:id" component={SingleAccount} />
      <Route exact path="/users/edit/:id" component={UpdateAccount} />
      <Route exact path="/users/aboutme/:id" component={UpdateAboutMe} />      

    </Switch> 
  </BrowserRouter>
)

export default App