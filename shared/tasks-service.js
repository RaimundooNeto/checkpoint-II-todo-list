import { getToken } from './storage-service.js';
import { translateErrors } from './utils.js'

let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append('authorization', getToken());

export async function getTasks() {
  return new Promise(resolve => {

    const requestOptions = {
      method: 'GET',
      headers: myHeaders
    };
  
    fetch("https://ctd-todo-api.herokuapp.com/v1/tasks", requestOptions)
    .then(response => {
      if(response.ok) {
        response.json()
        .then(result => {
          resolve(result); 
        })
      }
      else {
        resolve(null);
      }
    })
  })
}

export async function createTask(description) {
  return new Promise(resolve => {
    const raw = {
      description: description,
      completed: false
    }

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(raw)
    };
  
    fetch("https://ctd-todo-api.herokuapp.com/v1/tasks", requestOptions)
    .then(response => {
      if(response.ok) {
        response.json()
        .then(result => {
          resolve(result); 
        })
      }
      else {
        response.json()
        .then(result => {
          toastr.error(translateErrors(result)); 
          resolve(null);
        })
      }
    })
  })
}