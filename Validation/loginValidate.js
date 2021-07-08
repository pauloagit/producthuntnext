export default function loginValidate(values) {
    let errors = {}

    // Validate the email
    if(!values.email) {
        errors.email = 'El Email es obligatorio'
    } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = 'Email no válido'
    }

    // Validate password
    if(!values.password) {
        errors.password = 'El password es obligatorio'
    } else if(values.password.length < 6) {
        errors.password = 'El password debe ser de al menos 6 caracteres'
    }

    return errors
}
