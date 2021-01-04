import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade'
import { phrases } from '../data/phrases'
import Flip from 'react-reveal/Flip'




const Account = (props) => {

  const [phrase, updatePhrase] = useState('Money spent on traveling makes us happier than money spent on material things.')
  const [countries, setCountries] = useState([])
  const [activeCountry, setActiveCountry] = useState('')
  const [activeFlag, setActiveFlag] = useState('')
  const [flags, setFlags] = useState([])

  const [flagsReady, setFlagsReady] = useState(false)
  const userId = props.match.params.id
  const token = localStorage.getItem('token')

  const [accountData, updateAccountData] = useState({})

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

      }, 4000)


    }

  }, [activeCountry, flagsReady])




  useEffect(() => {
    axios.get(`/api/users/${userId}`)
      .then((resp) => {
        updateAccountData(resp.data)


        const respCountries = resp.data.favourites

        respCountries.forEach((favourite) => {
          countries.push(favourite)
        })

        console.log('2222')
        getCountryFlag(respCountries)

        setActiveCountry(respCountries[0])


      })
  }, [])

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
    console.log(flagsToSend[0])
    setActiveFlag(flagsToSend[0])

    setFlagsReady(true)
  }

  function handleDelete() {
    axios.delete(`/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(() => {
        localStorage.removeItem('token')
        props.history.push('/')
      })
    return console.log('delete function active')
  }




  if (activeCountry) {
    var activeCountryCap = activeCountry.toUpperCase()


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
      <div className="user-info" >

        <img className="profile-picture" src={accountData.image} />
        <h1 className="username" >{accountData.username}</h1>
        <Link to={`/users/${userId}/edit`} className="btn btn-secondary btn-md btn-update">Update Details</Link>
        <button onClick={handleDelete} className="btn btn-secondary btn-md btn-custom delete-user">Delete Account</button>

      </div>
    </Fade>

  </div>

}

export default Account

