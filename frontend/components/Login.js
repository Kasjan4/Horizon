import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade'
import Slide from 'react-reveal/Slide'
import { phrases } from '../data/phrases'



const Login = (props) => {

  const [phrase, updatePhrase] = useState('On the island of Yap, a state of Micronesia, rocks are used as currency.')

  const [formData, updateFormData] = useState({
    email: '',
    password: ''
  })

  const [errors, updateErrors] = useState({
    message: ''
  })

  function handleChange(event) {
    const data = {
      ...formData,
      [event.target.name]: event.target.value
    }
    updateFormData(data)

  }

  function handleSubmit(event) {
    event.preventDefault()

    axios.post('/api/login', formData)
      .then(resp => {

        if (resp.data.message) {
          updateErrors(resp.data)

        } else {
          localStorage.setItem('token', resp.data.token)
          props.history.push('/add')
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

    <div className="login-welcome">
      <Slide left duration={500}>
        <p>Welcome to <strong>HORIZON</strong>,</p>
      </Slide>
      <Slide left >
        <p>the place to store your travel wishlist.</p>
      </Slide>
    </div>

    <Fade top appear spy={phrase}>
      <h1 className="phrases" >{phrase}</h1>
    </Fade>


    <Fade>


      <form onSubmit={handleSubmit}>

        <div className="form-group text-center">

          <input
            className="form-control"
            placeholder="Email"
            type="email"
            onChange={handleChange}
            value={formData.email}
            name="email"
            required
          />

        </div>

        <div className="form-group">

          <input
            className="form-control"
            id="input-custom"
            placeholder="Password"
            type="password"
            onChange={handleChange}
            value={formData.password}
            name="password"
            required
          />

        </div>

        {errors.message && <p id="error" style={{ color: 'red' }}>
          {errors.message}
        </p>}

        <button className="btn btn-secondary btn-md btn-custom">Login</button>

      </form>

      <p className="signup-query" >Don&apos;t have an account? Sign up <Link to="/signup">here</Link></p>



    </Fade>
  </div>



}

export default Login