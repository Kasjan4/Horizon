import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MapGL, { Marker, LinearInterpolator, FlyToInterpolator } from 'react-map-gl'
import { Link } from 'react-router-dom'

const Home = () => {

 
  
  return <div className="home-container">
    <h1>Horizon</h1>
    <p>Tap to add a country</p>

   
  </div >

}

export default Home