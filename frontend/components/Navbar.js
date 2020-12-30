import React, { useState, useEffect } from 'react'
import { Link, withRouter } from 'react-router-dom'
import Fade from 'react-reveal/Fade'




const Navbar = (props) => {


  const token = localStorage.getItem('token')

  const [logoutScreen, updateLogoutScreen] = useState(false)

  if (token) {
    const parsedToken = JSON.parse(atob(token.split('.')[1]))
    console.log(parsedToken)
    var userId = parsedToken.sub
  }






  function handleLogout() {
    localStorage.removeItem('token')
    updateLogoutScreen(true)
    props.history.push('/login')

    setTimeout(() => {
      updateLogoutScreen(false)
    }, 5000)
  }

  return <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">


    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive">
      <span className="navbar-toggler-icon"></span>
    </button>

    <Fade top spy={logoutScreen}>
      {logoutScreen && <div className="logout-screen">
        <p>Enjoy your day!</p>
      </div>}
    </Fade>

    <div className="collapse navbar-collapse text-right" id="navbarResponsive">
      <ul className="navbar-nav ml-auto">


        <Fade>
          <p className="navbar-brand" href="#">HORIZON</p>
        </Fade>

        {token && <li className="nav-item">
          <Link to="/add" className="nav-link">Add</Link>
        </li>}

        {token && <li className="nav-item">
          <Link to="/map" className="nav-link">Map</Link>
        </li>}

        {token && <li className="nav-item">
          <Link to="/flights" className="nav-link">Flights</Link>
        </li>}

        {token && <li className="nav-item">
          <Link to="/hotels" className="nav-link">Hotels</Link>
        </li>}

        {token && <li className="nav-item">
          <Link to="/carhire" className="nav-link">Car Hire</Link>
        </li>}

        {!token && <li className="nav-item">
          <Link to="/signup" className="nav-link">Sign Up</Link>
        </li>}

        {!token && <li className="nav-item">
          <Link to="/" className="nav-link">Login</Link>
        </li>}

        {token && <li className="nav-item">
          <Link to={`/users/${userId}/chat`} className="nav-link">Chat</Link>
        </li>}

        {token && <li className="nav-item">
          <Link to={`/users/${userId}`} className="nav-link">Account</Link>
        </li>}

        {token && <li className="nav-item">
          <Link to="/" className="nav-link nav-contact"
            onClick={handleLogout}
          >Logout</Link>
        </li>}




      </ul>
    </div>



  </nav>



}


export default withRouter(Navbar)