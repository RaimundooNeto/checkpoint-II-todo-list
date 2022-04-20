import { customValidation } from '../shared/utils.js';
import { signup } from '../shared/user-service.js';

const signupfields = document.querySelectorAll('[required]');

for (let field of signupfields) {
  field.addEventListener("invalid", event => {
    event.preventDefault()

    customValidation(event)
  })
  field.addEventListener("blur", customValidation)
}

document.querySelector("form")
  .addEventListener("submit", event => {
    event.preventDefault();

    const name = document.querySelector('#inputName').value.trim();
    const lastname = document.querySelector('#inputLastName').value.trim();
    const email = document.querySelector('#inputEmail').value.trim();
    const password = document.querySelector('#inputPassword').value.trim();
    const repeatPassword = document.querySelector('#inputRepeatPassword').value.trim();

    if(password == repeatPassword) {
      const user = {
        "firstName": `${name}`,
        "lastName": `${lastname}`,
        "email": `${email}`,
        "password": `${password}`
      }
      signup(user);
    } else {
      toastr.error('As senhas não são iguais!');
    }
    
  })