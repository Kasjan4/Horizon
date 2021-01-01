import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade'
import Swing from 'react-reveal/Swing'
import { phrases } from '../data/phrases'



const Hotels = (props) => {

  const [phrase, updatePhrase] = useState('During a normal flight, the temperature outside your plane is around -60ºF. That’s colder than almost anywhere on Earth at any given moment of the year.')

  const [plane, setPlane] = useState(false)

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


    <Fade left when={plane}>
      <img className={plane === true ? 'plane' : 'none-plane'} src="https://i.imgur.com/fJUxssw.png" onLoad={() => setPlane(true)} />
    </Fade>


    <Fade>
      <div data-skyscanner-widget="FlightSearchWidget" data-locale="en-GB" data-params="fontColour:#ffffff;buttonColour:#1e77eb;buttonFontColour:#fff;"></div>

    </Fade>

  </div>



}

export default Hotels