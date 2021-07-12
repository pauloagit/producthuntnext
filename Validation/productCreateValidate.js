export default function productCreateValidate(values) {
  const errors = {}

  // Validate the user name
  if (!values.name) {
    errors.name = "El Nombre es obligatorio"
  }

  // Validate company
  if (!values.company) {
    errors.company = "El Nombre de la empresa es obligatorio"
  }

  // Validate ulr
  if (!values.url) {
    errors.url = "La URL del producto es obligatoria"
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
    errors.url = "Formato de URL no válido"
  }

  // Validate description
  if (!values.description) {
    errors.description = "Agrega una descripción de tu producto"
  }

  return errors
}
