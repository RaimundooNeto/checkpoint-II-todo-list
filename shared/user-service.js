import { setToken } from '../shared/storage-service.js';
import { translateErrors } from '../shared/utils.js';

let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

export function login(email, password) {

  const raw = JSON.stringify({
    "email": `${email}`,
    "password": `${password}`
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw
  };

  fetch("https://ctd-todo-api.herokuapp.com/v1/users/login", requestOptions)
  .then(response => {
    if(response.ok) {
      response.json()
      .then(result => {
        setToken(result.jwt);
        window.location.href = '../tarefas.html';
      })
    }
    else {
      response.json()
      .then(result => {
        toastr.error(translateErrors(result))
      })
      
    }
  })
}

export function signup(user) {

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(user)
  };

  fetch("https://ctd-todo-api.herokuapp.com/v1/users", requestOptions)
  .then(response => {
    if(response.ok) {
      response.json()
      .then(result => {
        toastr.success('Cadastro realizado com sucesso!');
        setTimeout(() => {
          window.location.href = '../index.html';
        }, 2000); 
      })
    }
    else {
      response.json()
      .then(result => {
        toastr.error(translateErrors(result))
      })
      
    }
  })
}