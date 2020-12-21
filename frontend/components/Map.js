import React, { useState, useEffect } from 'react'
import axios from 'axios'
import MapGL, { Marker, LinearInterpolator, FlyToInterpolator } from 'react-map-gl'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'

const Map = (props) => {

  const token = localStorage.getItem('token')

  if (token) {
    const parsedToken = JSON.parse(atob(token.split('.')[1]))

    var userId = parsedToken.sub
  }

  const [markers, updateMarkers] = useState([])
  const [countries, updateCountries] = useState([])

  const markericon = <FontAwesomeIcon icon={faMapMarkerAlt} size="3x" />

  const [viewPort, setViewPort] = useState({
    height: '100vh',
    width: '100vw',
    zoom: 1.5,
    latitude: 54.5260,
    longitude: 15.2551

  })

  useEffect(() => {
    axios.get(`/api/users/${userId}`)
      .then((resp) => {
        const favourites = resp.data.favourites

        updateMarkers(favourites, getMarkers(favourites))



      })
  }, [])

  // useEffect(() => {
  //   axios.get('https://restcountries.eu/rest/v2/all')
  //     .then((resp) => {
  //       const countrynames = resp.data

  //       let countryarray = []
  //       for (let i = 0; i < countrynames.length; i++) {

  //         countryarray.push(countrynames[i].name)

  //       }

  //     })
  // }, [])




  async function getMarkers(markersPassed) {

    const markerarray = []

    for (let i = 0; i < markersPassed.length; i++) {
      let marker = axios.get(`https://restcountries.eu/rest/v2/name/${markersPassed[i]}`)

      markerarray.push(marker)
    }

    let res = await axios.all(markerarray)
    updateCountries(res)

  }


  return <div className="container-global text-center">

    {!MapGL && <div>
      <h1>loading</h1>
    </div>}

    <MapGL

      mapboxApiAccessToken={'pk.eyJ1Ijoic2Vhbi1mZW5lbG9uIiwiYSI6ImNraGMxbHBvOTAycWUycm1wczNpemZ0MGsifQ.phMK4dt1j_7wvlbYTbLWxg'}
      mapStyle='mapbox://styles/kasjanhinc/ckiw1m7w44dlv19pfrnzukk4u'
      transitionInterpolator={new FlyToInterpolator()}
      transitionDuration={1000}
      {...viewPort}
      onViewportChange={(viewPort) => setViewPort(viewPort)}
    >

      {countries.map((country, index) => {
        console.log(country)
        return <Marker

          latitude={country.data[0].latlng[0]}
          longitude={country.data[0].latlng[1]}
          offsetTop={-38}
          offsetLeft={-17}
          key={index}
          
        >
          <div className="marker" >

            <div marker-icon >{markericon}</div>

            <div className="marker-info" >
              <img className="marker-flag" src={country.data[0].flag} />
              <p className="marker-name" >{country.data[0].name}</p>
              <p className="marker-capital" ><strong>Capital:</strong> {country.data[0].capital}</p>

              <p className="marker-subregion" ><strong>Region:</strong> {country.data[0].subregion}</p>
              <p className="marker-timezones" ><strong>Timezone:</strong> {country.data[0].timezones[0]}</p>

              <a href="https://www.booking.com/" target="_blank" rel="noreferrer" className="btn btn-secondary btn-md btn-custom">Booking.com</a>

            </div>

          </div>

        </Marker>


      })}


    </MapGL>



  </div >

}

export default Map