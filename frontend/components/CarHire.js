import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade'
import Slide from 'react-reveal/Slide'
import { phrases } from '../data/phrases'



const CarHire = (props) => {

  const [car, setCar] = useState(false)
  const [road, setRoad] = useState(false)

  useEffect(() => {
    const script = document.createElement('script')

    script.src = 'https://widgets.skyscanner.net/widget-server/js/loader.js'
    script.async = true

    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [])


  return <div className="container-global">

    <Fade left when={car}>
      <img className={car === true ? 'car' : 'none-car'} src="https://i.imgur.com/9AZFWti.png" onLoad={() => setCar(true)} />
    </Fade>

    <Slide up when={road} duration={2000}>
      <img className={road === true ? 'road' : 'none-road'} src="https://i.imgur.com/GeA6wMo.png" onLoad={() => setRoad(true)} />
    </Slide>




    <Fade>
      <div data-skyscanner-widget="CarHireWidget" data-locale="en-GB" data-params="fontColour:#ffffff;buttonColour:#1e77eb;buttonFontColour:#fff;"></div>
    </Fade>


  </div>



}

export default CarHire