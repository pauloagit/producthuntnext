import React, { useEffect, useState } from "react"

const useValidation = (initialState, validate, fn) => {
  const [values, setValues] = useState(initialState)
  const [errors, setErrors] = useState({})
  const [submitForm, setSubmitForm] = useState(false)

  useEffect(() => {
    if (submitForm) {
      const noErrors = Object.keys(errors).length === 0

      if (noErrors) {
        fn() // fn = The function that executes at the component
      }

      setSubmitForm(false)
    }
  }, [errors])

  // The function that executes when the user write somethings
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value,
    })
  }

  // The function that executes when the user do submit
  const handleSubmit = (e) => {
    e.preventDefault()
    const validationErrors = validate(values)
    setErrors(validationErrors)
    setSubmitForm(true)
  }

  // When blur event fire
  const handleBlur = () => {
    const validationErrors = validate(values)
    setErrors(validationErrors)
  }

  return { values, errors, handleSubmit, handleChange, handleBlur }
}

export default useValidation
