import React from 'react';
import styled from '@emotion/styled'
import Image from 'next/image';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale'

const Img = styled.img`
    width: 20rem;
`

const ProductDetails = ({product}) => {
    const { id, name, company, image, url, description, votes, urlImage, created, comments } = product

    return (
        <li>
            <div>
                <div>
                    <Img src={urlImage}/>
                </div>

                <div>
                    <h1>{name}</h1>

                    <p>{description}</p>
                </div>

                <div>
                    <Image
                        src="/static/img/comentario.png"
                        width='20px'
                        height='20px'
                    />
                    <p>{comments.length} Comentarios</p>
                </div>

                <div>
                    <p>Publicado: { formatDistanceToNow(new Date(created), { locale: es})}</p>
                </div>
            </div>

            <div>
                <div>&#9650;</div>
                <p>{ votes }</p>
            </div>
        </li>
    );
};

export default ProductDetails;
