import React from 'react'

function useForm(initialState) {
  const [formdata, setFormdata] = React.useState(initialState)
  const [errors, setErrors] = React.useState(initialState)

  const handleChange = event => {
    const nextState = { ...formdata, [event.target.name]: event.target.value }
    const nextErrorState = { ...errors, [event.target.name]: '' }
    setFormdata(nextState)
    setErrors(nextErrorState)
    console.log(event.target.value)
  }

  return {
    formdata,
    errors,
    handleChange,
    setErrors,
    setFormdata
  }
}

export default useForm