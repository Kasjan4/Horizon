import React, { useState, useEffect } from 'react'
import Fade from 'react-reveal/Fade'
import Slide from 'react-reveal/Slide'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { countryList } from '../data/search'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMicrophone } from '@fortawesome/free-solid-svg-icons'

import axios from 'axios'
import { Link } from 'react-router-dom'




const Add = (props) => {

  const token = localStorage.getItem('token')

  if (token) {
    const parsedToken = JSON.parse(atob(token.split('.')[1]))

    var userId = parsedToken.sub
  }



  const commands = [
    {
      command: '*',
      callback: (command) => handleVoiceSubmit(command)
    }

  ]


  const mic = <FontAwesomeIcon icon={faMicrophone} size="3x" />
  // const micoff = <FontAwesomeIcon icon={faMicrophoneSlash} size="3x" />
  const { transcript, resetTranscript } = useSpeechRecognition({ commands })
  const [errors, updateErrors] = useState('')
  const [success, updateSuccess] = useState('')
  const [noCountry, updateNoCountry] = useState('')
  const [inputData, updateInputData] = useState('')


  function handleVoiceSubmit(country) {

    console.log(country)
    updateNoCountry('')
    const countries = [...countryList]
    const countryLowerCase = country.toLowerCase()

    if (!countries.includes(countryLowerCase)) {
      return updateNoCountry('Refine your search!')
    }

    else {
      updateNoCountry('')
      const voiceObj = {
        favourite: `${countryLowerCase}`
      }


      axios.post(`/api/users/${userId}/favourite`, voiceObj, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(resp => {

          const message = resp.data.message

          if (message) {
            const capMessage = message[0].toUpperCase() + message.substring(1)
            updateErrors(capMessage)

          }
          else {

            updateSuccess(`${country[0].toUpperCase() + country.substring(1)} has been added!`)
            console.log('country sent via voice!')

          }
        })
    }

  }






  function handleChange(event) {

    resetTranscript()
    updateSuccess('')
    updateErrors('')
    updateNoCountry('')
    console.log(event.target.value)


    console.log(event.target.value.length)

    if (event.target.value.length == 1) {
      return updateInputData(event.target.value[0].toUpperCase())
    }

    else if (event.target.value.length > 1) {
      return updateInputData(event.target.value[0].toUpperCase() + event.target.value.substring(1))
    }

    updateInputData(event.target.value)
  }

  function handleSubmit(event) {

    updateSuccess('')

    event.preventDefault()

    const inputLowerCase = inputData.toLowerCase()
    const inputCap = inputData[0].toUpperCase() + inputData.substring(1)

    if (!countryList.includes(inputLowerCase)) {
      return updateNoCountry('Refine your search!')
    }


    const capInputData = {
      favourite: `${inputLowerCase}`
    }

    axios.post(`/api/users/${userId}/favourite`, capInputData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {

        const message = resp.data.message

        if (message) {
          const capMessage = message[0].toUpperCase() + message.substring(1)
          updateErrors(capMessage)


        } else {
          console.log('country sent!')

          updateSuccess(`${inputCap} has been added!`)
        }
      })

  }




  return <div className="container-global text-center">



    <div className="home-info">
      <Slide left duration={500}>
        <p><em><strong>Hey there,</strong></em></p>
      </Slide>
      <Slide left >
        <p>Use the voice control or input field<br /> to add the countries you want to visit,<br /> then check them out on the world map!</p>
      </Slide>
    </div>


    <Fade>
      <div>
        <button id="mic" onClick={() => {
          SpeechRecognition.startListening();
          updateSuccess('');
          updateInputData('');
          updateErrors('');
          updateNoCountry('');
        }}
        >{mic}</button>
        {/* <button id="mic" onClick={SpeechRecognition.stopListening}>{micoff}</button>
        <button onClick={resetTranscript}>Reset</button> */}
      </div>

      <p className="or" >or</p>
    </Fade>




    <p className="transcript" >{transcript}</p>


    <Fade appear spy={inputData}>
      <p className="input-text">{inputData}</p>
    </Fade>


    <Fade appear spy={success}>
      <p className="success" >{success}</p>
    </Fade>

    <Fade appear spy={errors}>
      <p className="duplicate-found" >{errors}</p>
    </Fade>

    <Fade appear spy={noCountry}>
      <p className="no-country" >{noCountry}</p>
    </Fade>



    <Fade>
      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <input type="text" className="form-control" name="favourite" onChange={handleChange} maxLength="50" value={inputData} placeholder="Type a country"></input>
        </div>

        <button className="btn btn-secondary btn-md btn-custom">Add</button>

      </form>
    </Fade>

  </div >

}

export default Add