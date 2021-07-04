import App from 'next/app'
import firebase, { FirebaseContex } from "../firebase";

function MyApp({ Component, pageProps }) {

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
