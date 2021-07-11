import React, { useEffect, useState, useContext } from 'react';
import Layout from "../components/layout/Layout";
import { FirebaseContex } from '../firebase'
import ProductDetails from "../components/layout/ProductDetails";

const Home = () => {

    const [ products, setProducts ] = useState([])
    const { firebase } = useContext(FirebaseContex)

    useEffect(() => {
        const getProducts = () => {
            firebase.db.collection('products').orderBy('created', 'desc').onSnapshot(handlerSnapshot)
        }
        getProducts()
    }, []);

    function handlerSnapshot(snapshot) {
        const products = snapshot.docs.map( doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        })

        setProducts(products)
    }

    return (
        <div>
            <Layout>
                <div className="listado-productos">
                    <div className="contenedor">
                        <ul className="bg-white">
                            { products.map(product => (
                                <ProductDetails
                                    key={product.id}
                                    product={product}
                                />
                            ))}
                        </ul>
                    </div>
                </div>
            </Layout>
        </div>
    )
}

export default Home
