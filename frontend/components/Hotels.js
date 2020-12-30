import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade'
import Slide from 'react-reveal/Slide'
import { phrases } from '../data/phrases'



const Flights = (props) => {

  const [hotel, setHotel] = useState(false)
  const [palm, setPalm] = useState(false)


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

    <Fade left when={hotel}>
      <img className={hotel === true ? 'hotel' : 'none-hotel'} src="https://i.imgur.com/SDs5WBl.png" onLoad={() => setHotel(true)} />
    </Fade>

    <Slide up when={palm} delay={200}>
      <img className={palm === true ? 'palm' : 'none-palm'} src="https://i.imgur.com/QZkNBd8.png" onLoad={() => setPalm(true)} />
    </Slide>

    <Fade>

      <div data-skyscanner-widget="HotelSearchWidget" data-locale="en-GB" data-params="fontColour:#ffffff;buttonColour:#1e77eb;buttonFontColour:#fff;"></div>

    </Fade>


  </div>



}

export default Flights