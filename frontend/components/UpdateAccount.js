import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade'
import { phrases } from '../data/phrases'
import Flip from 'react-reveal/Flip'



const UpdateAccount = (props) => {
  const [phrase, updatePhrase] = useState('Russia only classified beer as an alcoholic drink in 2011')

  const [countries, setCountries] = useState([])
  const [activeCountry, setActiveCountry] = useState('')
  const [activeFlag, setActiveFlag] = useState('')
  const [flags, setFlags] = useState([])


  const [flagsReady, setFlagsReady] = useState(false)

  const id = props.match.params.id
  const token = localStorage.getItem('token')
  const [userData, updateUserData] = useState({})
  const [profilePic, updateProfilePic] = useState('')

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

    if (!flagsReady) {
      console.log('not good')
      return

    } else {
      console.log('11')
      setTimeout(() => {

        console.log(countries.length)

        if (countries.indexOf(activeCountry) < countries.length - 1) {

          let currentIndex = countries.indexOf(activeCountry) + 1

          setActiveCountry(countries[currentIndex])

          setActiveFlag(flags[currentIndex])
        }
        else if (countries.indexOf(activeCountry) < countries.length) {

          let currentIndex = 0

          setActiveCountry(countries[currentIndex])

          setActiveFlag(flags[currentIndex])
        }

      }, 3000)


    }

  }, [activeCountry, flagsReady])


  useEffect(() => {
    axios.get(`/api/users/${id}`)
      .then((resp) => {
        const userImage = resp.data.image
        updateUserData(resp.data)
        updateProfilePic(userImage)

        const respCountries = resp.data.favourites

        respCountries.forEach((favourite) => {
          countries.push(favourite)
        })

        console.log('2222')
        getCountryFlag(respCountries)

        setActiveCountry(respCountries[0])
      })
  }, [])

  const [formData, updateFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    image: `${profilePic}`
  })

  const [errors, updateErrors] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    image: ''
  })

  function handleChange(event) {


    const name = event.target.name

    const value = event.target.value

    const data = {
      ...formData,
      [name]: value,
      image: `${profilePic}`
    }
    const newErrors = {
      ...errors,
      [name]: ''
    }

    console.log(data)
    updateFormData(data)
    updateErrors(newErrors)

  }

  function handleUpdate(event) {

    event.preventDefault()
    console.log(formData)
    const token = localStorage.getItem('token')
    axios.put(`/api/users/${id}`, formData, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        console.log(res.data)
        props.history.push(`/users/${props.match.params.id}`)
      })

  }


  function handlePic(image) {

    updateProfilePic(image)

  }

  async function getCountryFlag(countries) {

    const flagsList = []

    for (let i = 0; i < countries.length; i++) {
      let country = axios.get(`https://restcountries.eu/rest/v2/name/${countries[i]}`)

      flagsList.push(country)
    }

    let res = await axios.all(flagsList)

    const flagsToSend = []

    res.forEach((country) => {
      const flag = country.data[0].flag
      flagsToSend.push(flag)
    })

    setFlags(...flags, flagsToSend)

    setActiveFlag(flagsToSend[0])

    setFlagsReady(true)
  }



  if (activeCountry) {
    var activeCountryCap = activeCountry.charAt(0).toUpperCase() + activeCountry.slice(1)


  }




  return <div className="container-global text-center">

    <Fade top appear spy={activeCountry}>
      <h1 className="countries-account" >{activeCountryCap}</h1>
    </Fade>

    <Flip left appear spy={activeFlag}>
      <img className="countries-account-flag" src={activeFlag} />
    </Flip>

    <Fade top appear spy={phrase}>
      <h1 className="phrases" >{phrase}</h1>
    </Fade>


    <Fade>

      <form onSubmit={handleUpdate}>

        <div className="update-picture">

          <Fade>
            <img onClick={() => handlePic('https://i.imgur.com/uQyt00P.jpg')} className={profilePic === 'https://i.imgur.com/uQyt00P.jpg' ? 'profile-picture-update-active' : 'profile-picture-update'} src="https://i.imgur.com/uQyt00P.jpg" />
          </Fade>

          <Fade delay={200}>
            <img onClick={() => handlePic('https://i.imgur.com/HsqOaU6.jpg')} className={profilePic === 'https://i.imgur.com/HsqOaU6.jpg' ? 'profile-picture-update-active' : 'profile-picture-update'} src="https://i.imgur.com/HsqOaU6.jpg" />
          </Fade>

          <Fade delay={400}>
            <img onClick={() => handlePic('https://i.imgur.com/INLVHkv.jpg')} className={profilePic === 'https://i.imgur.com/INLVHkv.jpg' ? 'profile-picture-update-active' : 'profile-picture-update'} src="https://i.imgur.com/INLVHkv.jpg" />
          </Fade>

        </div>


        <div className="form-group">
          <input
            className="form-control"
            placeholder={userData.username}
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
            placeholder={userData.email}
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



        <button className="btn btn-secondary btn-md btn-custom">Update</button>


      </form>





    </Fade>
  </div>

}

export default UpdateAccount

