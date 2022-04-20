import { getUser, logOut } from '../shared/user-service.js';

// manage logged user flow ______________

const user = await getUser();

if(user) {

  const userNameReference = document.querySelector('#userName');
  userNameReference.innerHTML = user.firstName + ' ' + user.lastName;

} else {
  logOut();
}

// logout flow ________________________

const btnLogOutReference = document.querySelector('#closeApp');

btnLogOutReference.addEventListener('click', event => {
  logOut();
})