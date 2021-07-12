import App from "next/app"
import firebase, { FirebaseContex } from "../firebase"
import useAuthentication from "../hooks/useAuthentication"

function MyApp({ Component, pageProps }) {
  const user = useAuthentication()

  return (
    <FirebaseContex.Provider
      value={{
        firebase,
        user,
      }}
    >
      <Component {...pageProps} />
    </FirebaseContex.Provider>
  )
}

export default MyApp
