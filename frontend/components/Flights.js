import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade'
import Slide from 'react-reveal/Slide'
import Swing from 'react-reveal/Swing'
import { phrases } from '../data/phrases'



const Hotels = (props) => {

  const [plane, setPlane] = useState(false)
  const [planeWindow, setPlaneWindow] = useState(false)



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


    <Fade left when={plane}>
      <img className={plane === true ? 'plane' : 'none-plane'} src="https://i.imgur.com/fJUxssw.png" onLoad={() => setPlane(true)} />
    </Fade>

    <Swing when={planeWindow}>
      <img className={planeWindow === true ? 'planewindow' : 'none-planewindow'} src="https://i.imgur.com/0HG6INR.png" onLoad={() => setPlaneWindow(true)} />
    </Swing>

    <Fade>
      <div data-skyscanner-widget="FlightSearchWidget" data-locale="en-GB" data-params="fontColour:#ffffff;buttonColour:#1e77eb;buttonFontColour:#fff;"></div>

    </Fade>

  </div>



}

export default Hotels