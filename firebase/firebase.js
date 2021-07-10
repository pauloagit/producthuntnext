import app from 'firebase/app'
import 'firebase/auth'
import firebaseConfig from "./config";

class Firebase {
    constructor() {
        if(!app.apps.length) {
            app.initializeApp(firebaseConfig)
        }
        this.auth = app.auth()
    }

    // User register
    async register(name, email, password) {
        const newUser = await this.auth.createUserWithEmailAndPassword(email, password)

        return await newUser.user.updateProfile({
            displayName : name
        })
    }

    // Login user
    async login(email, password) {
        return this.auth.signInWithEmailAndPassword(email, password)
    }

    // Log off user
    async logoff() {
        await this.auth.signOut()
    }
}

const firebase = new Firebase()

export default firebase
