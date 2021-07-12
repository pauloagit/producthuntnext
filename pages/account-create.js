import React, { useState } from "react"
import { css } from "@emotion/react"
import Router from "next/router"
import Layout from "../components/layout/Layout"
import { Form, Field, InputSubmit, Error } from "../components/ui/Form"

import firebase from "../firebase"

// Validations
import useValidation from "../hooks/useValidation"
import accountCreateValidate from "../Validation/accountCreateValidate"

const INITIAL_STATE = {
  name: "",
  email: "",
  password: "",
}

const AccountCreate = () => {
  const [error, setError] = useState(false)

  const { values, errors, handleSubmit, handleChange, handleBlur } =
    useValidation(INITIAL_STATE, accountCreateValidate, accountCreate)

  const { name, email, password } = values

  async function accountCreate() {
    try {
      await firebase.register(name, email, password)
      Router.push("/")
    } catch (error) {
      console.error("Hubo un error al crear el usuario", error.message)
      setError(error.message)
    }
  }

  return (
    <Layout>
      <>
        <h1
          css={css`
            text-align: center;
            margin-right: 5rem;
          `}
        >
          Crear Cuenta
        </h1>

        <Form onSubmit={handleSubmit} noValidate>
          <Field>
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              placeholder="Tu Nombre"
              name="name"
              value={name}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Field>

          {errors.name && <Error>{errors.name}</Error>}

          <Field>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Tu Email"
              name="email"
              value={email}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Field>

          {errors.email && <Error>{errors.email}</Error>}

          <Field>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Tu Password"
              name="password"
              value={password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </Field>

          {errors.password && <Error>{errors.password}</Error>}

          {error && <Error>{error}</Error>}

          <InputSubmit type="submit" value="Crear Cuenta" />
        </Form>
      </>
    </Layout>
  )
}

export default AccountCreate
