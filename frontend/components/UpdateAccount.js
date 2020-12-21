import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Fade from 'react-reveal/Fade'


const UpdateAccount = (props) => {

  const id = props.match.params.id
  const token = localStorage.getItem('token')
  const [userData, updateUserData] = useState({})
  const [profilePic, updateProfilePic] = useState('')
  const [active, setActive] = useState(true)


  useEffect(() => {
    axios.get(`/api/users/${id}`)
      .then((resp) => {
        const userImage = resp.data.image
        updateUserData(resp.data)
        updateProfilePic(userImage)
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

  console.log(profilePic)

  return <div className="container-global text-center">


    <img className="palm" src="https://i.imgur.com/QZkNBd8.png" />
    <img className="ship" src="https://i.imgur.com/mD12Fvo.png" />


    <Fade>

      <form onSubmit={handleUpdate}>

        <div className="update-picture">

          <img onClick={() => handlePic('https://i.imgur.com/uQyt00P.jpg')} className={profilePic === 'https://i.imgur.com/uQyt00P.jpg' ? 'profile-picture-update-active' : 'profile-picture-update'} src="https://i.imgur.com/uQyt00P.jpg"  />
          <img onClick={() => handlePic('https://i.imgur.com/HsqOaU6.jpg')} className={profilePic === 'https://i.imgur.com/HsqOaU6.jpg' ? 'profile-picture-update-active' : 'profile-picture-update'} src="https://i.imgur.com/HsqOaU6.jpg" />
          <img onClick={() => handlePic('https://i.imgur.com/INLVHkv.jpg')} className={profilePic === 'https://i.imgur.com/INLVHkv.jpg' ? 'profile-picture-update-active' : 'profile-picture-update'} src="https://i.imgur.com/INLVHkv.jpg" />

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

