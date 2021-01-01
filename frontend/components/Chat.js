import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { getUserId, isCreator } from '../lib/auth'
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade'
import Slide from 'react-reveal/Slide'
import { phrases } from '../data/phrases'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsAltV } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faGlobeEurope } from '@fortawesome/free-solid-svg-icons'
import { faGlobeAsia } from '@fortawesome/free-solid-svg-icons'
import { faGlobeAfrica } from '@fortawesome/free-solid-svg-icons'
import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons'
import { faSnowflake } from '@fortawesome/free-solid-svg-icons'
import { faQuestionCircle } from '@fortawesome/free-solid-svg-icons'





const Chat = (props) => {

  const token = localStorage.getItem('token')

  const trash = <FontAwesomeIcon icon={faTrash} size="1x" />
  const europe = <FontAwesomeIcon icon={faGlobeEurope} size="1x" />
  const africa = <FontAwesomeIcon icon={faGlobeAfrica} size="1x" />
  const asia = <FontAwesomeIcon icon={faGlobeAsia} size="1x" />
  const americas = <FontAwesomeIcon icon={faGlobeAmericas} size="1x" />
  const antarctica = <FontAwesomeIcon icon={faSnowflake} size="1x" />
  const other = <FontAwesomeIcon icon={faQuestionCircle} size="1x" />


  const arrow = <FontAwesomeIcon icon={faArrowsAltV} size="1x" />
  // const userId = props.match.params.id

  // const [accountData, updateAccountData] = useState({})

  const [activeRegion, setActiveRegion] = useState('Europe')
  const [messages, setMessages] = useState([])
  const [messagesReady, setMessagesReady] = useState(false)

  const [inputText, setInputText] = useState('')
  const [inputMessage, setInputMessage] = useState({})



  useEffect(() => {
    axios.get('/api/chat', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((resp) => {

        if (resp.data.errors) {
          console.log(resp.data.errors)
        }

        else {

          const allRegions = resp.data
          const activeMessages = []

          allRegions.map((region) => {

            if (region.region === activeRegion) {
              activeMessages.push(region)
            } else {
              return
            }

          })

          setMessages(activeMessages)


          setMessagesReady(true)
          scrollToBottom()




        }

      })
  }, [activeRegion])




  function handleRegion(event) {

    if (event.target.name === activeRegion) {
      return
    } else {
      setMessagesReady(false)
      setActiveRegion(event.target.name)
    }

  }
  function handleChange(event) {

    const message = {
      ...inputMessage,
      message: event.target.value,
      region: activeRegion
    }
    setInputText(event.target.value)
    setInputMessage(message)
  }
  function handleSubmit(event) {
    event.preventDefault()
    setInputMessage({})

    axios.post('/api/chat/post', inputMessage, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {

        const newMessages = []
        newMessages.push(resp.data)

        setMessages(newMessages)
        scrollToBottom()
        setInputText('')
      })
  }
  function scrollToBottom() {
    const objDiv = document.getElementById('scroll-behaviour')
    objDiv.scrollTop = objDiv.scrollHeight
  }
  function handleDeleteComment(messageText) {

    const data = {
      region: activeRegion,
      message: messageText
    }

    axios.put('/api/chat/delete', data, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(resp => {
        console.log(resp.data)

        const newMessages = []
        newMessages.push(resp.data)

        console.log(newMessages)

        setMessages(newMessages)
        scrollToBottom()
      })
  }






  return <div className="container-global">

    <Fade>

      <div className="chat-container">

        <div className="regions">
          <p className="region-title" >Regions</p>
          <div className="regions-arrow">{arrow}</div>
          <div className="regions-list">

            <button onClick={handleRegion} name="Europe" className="btn btn-secondary btn-md btn-region">Europe {europe}</button>
            <button onClick={handleRegion} name="Asia" className="btn btn-secondary btn-md btn-region">Asia {asia}</button>
            <button onClick={handleRegion} name="North America" className="btn btn-secondary btn-md btn-region">North America {americas}</button>
            <button onClick={handleRegion} name="South America" className="btn btn-secondary btn-md btn-region">South America {americas}</button>
            <button onClick={handleRegion} name="Africa" className="btn btn-secondary btn-md btn-region">Africa {africa}</button>
            <button onClick={handleRegion} name="Oceania" className="btn btn-secondary btn-md btn-region">Oceania {asia}</button>
            <button onClick={handleRegion} name="Antarctica" className="btn btn-secondary btn-md btn-region">Antarctica {antarctica}</button>
            <button onClick={handleRegion} name="Other" className="btn btn-secondary btn-md btn-region">Other {other}</button>


          </div>

        </div>


        {messagesReady && <div className="messages">

          <p className="messages-title" >Chat ({activeRegion})</p>

          <div className="messages-list" id="scroll-behaviour">

            {messages[0].messages.map((message, index) => {


              return <div key={index} className="message-single-container" >

                <p className="message-single-user" >{message.user} </p>

                <div className="message-content-creator">
                  <p className="message-single-message" >{message.message}</p>
                  {isCreator(message.user_id) && <a className="trash-icon" onClick={() => handleDeleteComment(message.message)}>{trash}</a>}
                </div>

              </div>

            })}


          </div>

          <div className="messages-input">

            <form onSubmit={handleSubmit} className="form-chat" >
              <textarea onChange={handleChange} value={inputText} className="message-input" type="text" rows="1" cols="50"></textarea>
              <button className="btn btn-secondary btn-md btn-custom btn-input-message" >Send</button>
            </form>

          </div>

        </div>}

      </div>

    </Fade>

  </div>



}

export default Chat