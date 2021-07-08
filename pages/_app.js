import App from 'next/app'
import firebase, { FirebaseContex } from "../firebase";
import useAuthentication from "../hooks/useAuthentication";

function MyApp({ Component, pageProps }) {
    const user = useAuthentication()
    console.log(user)

    return (
        <FirebaseContex.Provider
            value={{
                firebase
            }}
        >
            <Component {...pageProps} />
        </FirebaseContex.Provider>
    )
}

export default MyApp
