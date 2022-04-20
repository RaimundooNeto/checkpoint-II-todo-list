//FILEDS VALIDATE FUNCTIONS ________________________

function ValidateField(field) {
  
  function verifyErrors() {
    let foundError = false;

    for (let error in field.validity) {
      if (field.validity[error] && !field.validity.valid) {
        foundError = error
      }
    }
    return foundError;
  }

  function customMessage(typeError) {
    const messages = {
      text: {
        valueMissing: "❌ Por favor, preencha este campo",
        tooShort: "❌ A quantidade mínima de caracteres é 3"
      },
      email: {
        valueMissing: "❌ Email é obrigatório",
        typeMismatch: "❌ Por favor, preencha um email válido"
      },
      password: {
        valueMissing: "❌ Senha é obrigatória",
        tooShort: "❌ A senha deve conter pelo menos 6 caracteres"
      }
    }

    return messages[field.type][typeError]
  }

  function setCustomMessage(message) {
    const spanError = field.parentNode.querySelector("span.error")

    if (message) {
      spanError.classList.add("active")
      spanError.innerHTML = message
    } else {
      spanError.classList.remove("active")
      spanError.innerHTML = ""
    }
  }

  return function () {

    const error = verifyErrors()

    if (error) {
      const message = customMessage(error)

      field.style.borderColor = "red"
      setCustomMessage(message)
    } else {
      field.style.borderColor = "green"
      setCustomMessage()
    }
  }
}

export function customValidation(event) {

  const field = event.target
  const validation = ValidateField(field)

  validation()

}
//____________________________________________

export function translateErrors(error) {
  const errors = {
    'Contraseña incorrecta': 'Senha incorreta!',
    'El usuario no existe': 'O usuário não existe',
    'El usuario ya se encuentra registrado': 'O usuário já está registrado',
    'Alguno de los datos requeridos está incompleto': 'Algum dos dados requeridos está incompleto',
    'Requiere Autorización': 'Autorização requerida',
    'default': 'Erro interno do servidor!'
  }

  return errors[error] || errors['default'];
}

// Format date ___________________________________

export function formatDate(date) {
  let newDate = new Date(date);
  const day = newDate.getDate();
  const month = newDate.getMonth();
  const year = newDate.getFullYear();

  return `${day}/${month}/${year}`;
}