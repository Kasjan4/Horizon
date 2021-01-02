import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade'
import Slide from 'react-reveal/Slide'
import { phrases } from '../data/phrases'



const CarHire = (props) => {

  const [phrase, updatePhrase] = useState('France is the most visited country in the world, with over 82 million international visitors per year. The United States (75.6 million) and Spain (75.6 million) round out the top three, respectively.')
  const [car, setCar] = useState(false)

  useEffect(() => {
    setTimeout(() => {

      let currentIndex = phrases.indexOf(phrase)

      let nextPhrases = [...phrases]

      nextPhrases.splice(currentIndex, 1)

      let randomPhrase = Math.floor(Math.random() * nextPhrases.length)

      updatePhrase(nextPhrases[randomPhrase])

    }, 7000)
  }, [phrase])

  const widget = useEffect(() => {
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

    <Fade left when={car}>
      <img className={car === true ? 'car' : 'none-car'} src="https://i.imgur.com/9AZFWti.png" onLoad={() => setCar(true)} />
    </Fade>






    <Fade spy={widget}>
      <div data-skyscanner-widget="CarHireWidget" data-locale="en-GB" data-params="fontColour:#ffffff;buttonColour:#1e77eb;buttonFontColour:#fff;"></div>
    </Fade>


  </div>



}

export default CarHire