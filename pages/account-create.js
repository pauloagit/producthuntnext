import React from 'react';
import { css } from '@emotion/react'
import Layout from "../components/layout/Layout";
import { Form, Field, InputSubmit } from "../components/ui/Form";

const AccountCreate = () => {
    return (
        <Layout>
            <>
                <h1
                    css={css`
                        text-align: center;
                        margin-right: 5rem;
                    `}
                >Crear Cuenta</h1>

                <Form>
                    <Field>
                        <label htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Tu Nombre"
                            name="name"
                        />
                    </Field>

                    <Field>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Tu Email"
                            name="email"
                        />
                    </Field>

                    <Field>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Tu Password"
                            name="password"
                        />
                    </Field>

                    <InputSubmit
                        type="submit"
                        value="Crear Cuenta"
                    />
                </Form>
            </>
        </Layout>

    );
};

export default AccountCreate;
