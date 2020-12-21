import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Fade from 'react-reveal/Fade'
import { phrases } from '../data/phrases'





const SignUp = (props) => {

  
  const [phrase, updatePhrase] = useState('Banana is a popular pizza topping in Sweden.')

  const [ticket, setTicket] = useState(false)

  const [formData, updateFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    isAdmin: false,
    image: 'https://i.imgur.com/uQyt00P.jpg'
  })

  const [errors, updateErrors] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    isAdmin: false,
    image: 'https://i.imgur.com/uQyt00P.jpg'
  })

  function handleChange(event) {

    const name = event.target.name

    const value = event.target.value

    const data = {
      ...formData,
      [name]: value
    }
    const newErrors = {
      ...errors,
      [name]: ''
    }

    updateFormData(data)
    updateErrors(newErrors)

  }

  function handleSubmit(event) {

    event.preventDefault()

    axios.post('/api/signup', formData)
      .then(resp => {
        console.log(resp.data)
        if (resp.data.errors) {
          updateErrors(resp.data.errors)
        } else {
          props.history.push('/login')
        }
      })

  }

  useEffect(() => {
    setTimeout(() => {

      let currentIndex = phrases.indexOf(phrase)

      let nextPhrases = [...phrases]

      nextPhrases.splice(currentIndex, 1)

      let randomPhrase = Math.floor(Math.random() * nextPhrases.length)

      updatePhrase(nextPhrases[randomPhrase])

    }, 7000)
  }, [phrase])

  return <div className="container-global">


    <Fade left when={ticket}>
      <img className={ticket === true ? 'signup-ticket' : 'none-signup-ticket'} src='https://i.imgur.com/ZVYVdt9.png' onLoad={() => setTicket(true)} />
    </Fade>

    <Fade top appear spy={phrase}>
      <h1 className="phrases" >{phrase}</h1>
    </Fade>

    <Fade>
      <form onSubmit={handleSubmit}>

        <div className="form-group text-center">
          <input
            className="form-control"
            placeholder="Username"
            type="text"
            onChange={handleChange}
            value={formData.username}
            name="username"
            required
          />
          {errors.username && <p id="error" style={{ color: 'red' }}>
            {`There was a problem with your ${errors.username.path}`}
          </p>}
        </div>

        <div className="form-group">
          <input
            className="form-control"
            placeholder="Email"
            type="text"
            onChange={handleChange}
            value={formData.email}
            name="email"
            required
          />
          {errors.email && <p id="error" style={{ color: 'red' }}>
            {`There was a problem with your ${errors.email.path}`}
          </p>}
        </div>

        <div className="form-group">
          <input
            className="form-control"
            placeholder="Password"
            type="Password"
            onChange={handleChange}
            value={formData.password}
            name="password"
            required
          />
          {errors.password && <p id="error" style={{ color: 'red' }}>
            {`There was a problem with your ${errors.password.path}`}
          </p>}
        </div>

        <div className="form-group">
          <input
            className="form-control"
            placeholder="Confirm Password"
            type="password"
            onChange={handleChange}
            value={formData.passwordConfirmation}
            name="passwordConfirmation"
            required
          />
          {errors.passwordConfirmation && <p id="error" style={{ color: 'red' }}>
            {'Does not match password'}
          </p>}
        </div>

        <button className="btn btn-secondary btn-md btn-custom">Submit</button>

      </form>


    </Fade>
  </div>



}

export default SignUp