import React, { useState } from "react"
import { css } from "@emotion/react"
import Router from "next/router"
import Layout from "../components/layout/Layout"
import { Form, Field, InputSubmit, Error } from "../components/ui/Form"

import firebase from "../firebase"

// Validations
import useValidation from "../hooks/useValidation"
import loginValidate from "../Validation/loginValidate"

const INITIAL_STATE = {
  email: "",
  password: "",
}

const Login = () => {
  const [error, setError] = useState(false)

  const { values, errors, handleSubmit, handleChange, handleBlur } =
    useValidation(INITIAL_STATE, loginValidate, login)

  const { email, password } = values

  async function login() {
    try {
      await firebase.login(email, password)
      Router.push("/")
    } catch (error) {
      console.error("Hubo un error al autenticar el usuario", error.message)
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
          Iniciar Sesión
        </h1>

        <Form onSubmit={handleSubmit} noValidate>
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

          <InputSubmit type="submit" value="Iniciar Sesión" />
        </Form>
      </>
    </Layout>
  )
}

export default Login
