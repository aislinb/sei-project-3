import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { showUserProfile, editUserProfile } from '../../lib/api'
import useForm from '../../utils/useForm'
import ProfileForm from './ProfileForm'

function ProfileEditCard() {
  const history = useHistory()
  const { id } = useParams()
  const { formdata, errors, handleChange, setFormdata, setErrors } = useForm({
    username: '',
    email: '',
    city: '',
    userImage: '',
    userBio: '',
    events: []
  })

  React.useEffect(() => {
    const getData = async () => {
      const { data } = await showUserProfile(id)
      setFormdata(data)
    }
    getData()
  }, [id, setFormdata])

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      await editUserProfile(formdata)
      history.push('/profile')
    } catch (err) {
      setErrors(err.response.data.errors)
    }
  }
  

  return (
    <section className="section">
      <div className="container">
        <ProfileForm
          formdata={formdata}
          errors={errors}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          buttonText="Submit"
        />
      </div>
    </section>
  )
}

export default ProfileEditCard