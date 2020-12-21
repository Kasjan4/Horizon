import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade'


const Account = (props) => {

  const userId = props.match.params.id
  const token = localStorage.getItem('token')


  // const [formData, updateFormData] = useState({})
  const [accountData, updateAccountData] = useState({})


  useEffect(() => {
    axios.get(`/api/users/${userId}`)
      .then((resp) => {
        updateAccountData(resp.data)
      })
  }, [])

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

  return <div className="container-global text-center">

    <Fade right duration={500}>
      <img className="palm" src="../img/palm.png" />
    </Fade>


    <Fade left >
      <img className="ship" src="../img/ship.png" />
    </Fade>






    <Fade>
      <div>

        <img className="profile-picture" src={accountData.image} />
        <h1 className="username" >{accountData.username}</h1>
        <Link to={`/users/${userId}/edit`} className="btn btn-secondary btn-md btn-custom">Update Details</Link>
        <button onClick={handleDelete} className="btn btn-secondary btn-md btn-custom delete-user">Delete Account</button>

      </div>
    </Fade>

  </div>

}

export default Account

