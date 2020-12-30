import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade'
import Slide from 'react-reveal/Slide'
import { phrases } from '../data/phrases'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowsAltV } from '@fortawesome/free-solid-svg-icons'


const Chat = (props) => {



  const arrow = <FontAwesomeIcon icon={faArrowsAltV} size="1x" />
  const userId = props.match.params.id

  const [accountData, updateAccountData] = useState({})

  const [activeRegion, setActiveRegion] = useState('Europe')
  const [messages, setMessages] = useState([])
  const [messagesReady, setMessagesReady] = useState(false)

  const [inputText, setInputText] = useState('')
  const [inputMessage, setInputMessage] = useState({})



  useEffect(() => {
    axios.get('/api/chat')
      .then((resp) => {
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
      })
  }, [activeRegion])


  useEffect(() => {
    axios.get(`/api/users/${userId}`)
      .then((resp) => {
        updateAccountData(resp.data)
      })
  }, [])





  function handleRegion(event) {
    setMessagesReady(false)
    setActiveRegion(event.target.name)
  }
  function handleChange(event) {

    const message = {
      ...inputMessage,
      user: accountData.username,
      message: event.target.value,
      region: activeRegion
    }
    setInputText(event.target.value)
    setInputMessage(message)
  }
  function handleSubmit(event) {
    event.preventDefault()
    setInputMessage({})

    axios.post('/api/chat/post', inputMessage)
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



  console.log(inputMessage)


  return <div className="container-global">

    <Fade>

      <div className="chat-container">

        <div className="regions">
          <p className="region-title" >Regions</p>
          <div className="regions-arrow">{arrow}</div>
          <div className="regions-list">

            <button onClick={handleRegion} name="Europe" className="btn btn-secondary btn-md btn-region">Europe</button>
            <button onClick={handleRegion} name="Asia" className="btn btn-secondary btn-md btn-region">Asia</button>
            <button onClick={handleRegion} name="North America" className="btn btn-secondary btn-md btn-region">North America</button>
            <button onClick={handleRegion} name="South America" className="btn btn-secondary btn-md btn-region">South America</button>
            <button onClick={handleRegion} name="Africa" className="btn btn-secondary btn-md btn-region">Africa</button>
            <button onClick={handleRegion} name="Oceania" className="btn btn-secondary btn-md btn-region">Oceania</button>
            <button onClick={handleRegion} name="Antarctica" className="btn btn-secondary btn-md btn-region">Antarctica</button>
            <button onClick={handleRegion} name="Other" className="btn btn-secondary btn-md btn-region">Other</button>


          </div>

        </div>


        {messagesReady && <div className="messages">
          <p className="messages-title" >Chat</p>

          <div className="messages-list" id="scroll-behaviour">

            {messages[0].messages.map((message, index) => {


              return <div key={index} className="message-single-container" >

                <p className="message-single-user" >{message.user} </p>

                <p className="message-single-message" >{message.message}</p>
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