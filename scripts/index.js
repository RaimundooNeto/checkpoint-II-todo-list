import { customValidation } from '../shared/utils.js';
import { login } from '../shared/user-service.js';

const loginfields = document.querySelectorAll('[required]');

for (let field of loginfields) {
  field.addEventListener("invalid", event => {
    event.preventDefault()

    customValidation(event)
  })
  field.addEventListener("blur", customValidation)
}

document.querySelector("form")
  .addEventListener("submit", event => {
    event.preventDefault();

    const email = document.querySelector('#inputEmail').value;
    const password = document.querySelector('#inputPassword').value;

    login(email, password);
  })