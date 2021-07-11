import React, { useState, useContext } from 'react'
import { css } from '@emotion/react'
import Router, { useRouter } from 'next/router'
import FirebaseFileUploader from "react-firebase-file-uploader";
import Layout from '../components/layout/Layout'
import {
    Form, Field, InputSubmit, Error,
} from '../components/ui/Form'

import { FirebaseContex } from '../firebase'

// Validations
import useValidation from '../hooks/useValidation'
import productCreateValidate from '../Validation/productCreateValidate'

const INITIAL_STATE = {
    name: '',
    company: '',
    image: '',
    url: '',
    description: '',
}
const NewProduct = () => {

    // images State
    const [imageName, setImageName] = useState('')
    const [uploading, setUploading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [urlImage, setUrlImage] = useState('')

    const [error, setError] = useState(false)

    // routing hook for redirect
    const router = useRouter()

    // Context with the CRUD firebase operation
    const { user, firebase } = useContext(FirebaseContex)

    const {
        values, errors, handleSubmit, handleChange, handleBlur,
    } = useValidation(INITIAL_STATE, productCreateValidate, productCreate)

    const { name, company, image, url, description } = values

    async function productCreate() {

        // if the user is not authenticated, redirect to login
        if (!user) {
            return router.push('/login')
        }

        // Create the new product object
        const product = {
            name,
            company,
            url,
            urlImage,
            description,
            votes: 0,
            comments: [],
            created: Date.now()
        }

        // Insert to Data Base
        firebase.db.collection('products').add(product)

        return router.push('/')
    }

    const handleChangeUsername = event =>
        this.setState({ username: event.target.value });

    const handleUploadStart = () => {
        setProgress(0)
        setUploading(true)
    }

    const handleProgress = progress => {
        setProgress(progress)
    };

    const handleUploadError = error => {
        setUploading(error)
        console.error(error);
    };

    const handleUploadSuccess = filename => {
        setProgress(100)
        setUploading(false)
        setImageName(filename)
        firebase
            .storage
            .ref("products")
            .child(filename)
            .getDownloadURL()
            .then(url => {
                console.log(url)
                setUrlImage(url)
            });
    };

    return (
        <Layout>
            <>
                <h1
                    css={css`
                        text-align: center;
                        margin-right: 5rem;
                    `}
                >
                    Nuevo Producto
                </h1>

                <Form
                    onSubmit={handleSubmit}
                    noValidate
                >
                    <fieldset>
                        <legend>Información General</legend>

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

                        { errors.name && <Error>{errors.name}</Error>}

                        <Field>
                            <label htmlFor="company">Empresa</label>
                            <input
                                type="text"
                                id="company"
                                placeholder="Tu Empresa"
                                name="company"
                                value={company}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Field>

                        { errors.company && <Error>{errors.company}</Error>}

                        <Field>
                            <label htmlFor="image">Imagen</label>
                            <FirebaseFileUploader
                                accept="image/*"
                                id="image"
                                name="image"
                                randomizeFilename
                                storageRef={firebase.storage.ref("products")}
                                onUploadStart={handleUploadStart}
                                onUploadError={handleUploadError}
                                onUploadSuccess={handleUploadSuccess}
                                onProgress={handleProgress}

                            />
                        </Field>

                        <Field>
                            <label htmlFor="url">URL</label>
                            <input
                                type="url"
                                id="url"
                                placeholder="Url del Producto"
                                name="url"
                                value={url}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Field>

                        { errors.url && <Error>{errors.url}</Error>}

                    </fieldset>

                    <fieldset>
                        <legend>Sobre tu producto</legend>

                        <Field>
                            <label htmlFor="description">Descripción</label>
                            <textarea
                                id="description"
                                placeholder="Describe tu Producto"
                                name="description"
                                value={description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        </Field>

                        { errors.description && <Error>{errors.description}</Error>}

                    </fieldset>

                    { error && <Error>{error}</Error>}

                    <InputSubmit
                        type="submit"
                        value="Crear Producto"
                    />
                </Form>
            </>
        </Layout>

    )
}

export default NewProduct
