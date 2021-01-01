import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade'
import Slide from 'react-reveal/Slide'
import { phrases } from '../data/phrases'



const Flights = (props) => {

  const [phrase, updatePhrase] = useState('Travel to Antarctica is rare for most people, but not for meteorites. 90% of all meteorites are found there.')

  const [hotel, setHotel] = useState(false)


  useEffect(() => {
    setTimeout(() => {

      let currentIndex = phrases.indexOf(phrase)

      let nextPhrases = [...phrases]

      nextPhrases.splice(currentIndex, 1)

      let randomPhrase = Math.floor(Math.random() * nextPhrases.length)

      updatePhrase(nextPhrases[randomPhrase])

    }, 7000)
  }, [phrase])

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

    <Fade top appear spy={phrase}>
      <h1 className="phrases" >{phrase}</h1>
    </Fade>

    <Fade left when={hotel}>
      <img className={hotel === true ? 'hotel' : 'none-hotel'} src="https://i.imgur.com/SDs5WBl.png" onLoad={() => setHotel(true)} />
    </Fade>



    <Fade>

      <div data-skyscanner-widget="HotelSearchWidget" data-locale="en-GB" data-params="fontColour:#ffffff;buttonColour:#1e77eb;buttonFontColour:#fff;"></div>

    </Fade>


  </div>



}

export default Flights