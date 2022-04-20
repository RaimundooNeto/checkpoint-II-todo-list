import { getUser, logOut } from '../shared/user-service.js';
import { getTasks, createTask } from '../shared/tasks-service.js';
import { formatDate } from '../shared/utils.js';

let tasks = undefined;

// manage logged user flow _____________________________________________________

const user = await getUser();

if(user) {

  // Set user name
  const userNameReference = document.querySelector('#userName');
  userNameReference.innerHTML = user.firstName + ' ' + user.lastName;

  //get tasks
  tasks = await getTasks();
  tasks.reverse();
  showTasks();

} else {
  logOut();
}

// Tasks________________________________________________________________________

//Add new Task
document.querySelector("form")
  .addEventListener("submit", async event => {
    event.preventDefault();

    const descriptionReference = document.querySelector('#newTask');

    if(descriptionReference.value.length !== 0) {
      const taskCreated =  await createTask(descriptionReference.value.trim());

      if(taskCreated) {
        toastr.success('Nova tarefa criada com sucesso');
        descriptionReference.value = '';
        tasks.unshift(taskCreated);
        showTasks();
      }
    } else {
      toastr.error('Não é possivel criar uma tarefa vazia');
    }
})

function showTasks() {
  const pendingTasksReference = document.querySelector('#pendingTasks');

  const pendingTasks = tasks.filter(task => task.completed == false);
  let pendingTasksHtml = '';

  for(let task of pendingTasks) {
    pendingTasksHtml += `
    <li class="tarefa" id="${task.id}">
      <div class="not-done"></div>
      <div class="descricao">
        <p class="nome">${task.description}</p>
        <p class="timestamp">Criada em: ${formatDate(task.createdAt)}</p>
      </div>
    </li>`
  }
  pendingTasksReference.innerHTML = pendingTasksHtml;
}

// logout flow _________________________________________________________________

const btnLogOutReference = document.querySelector('#closeApp');

btnLogOutReference.addEventListener('click', event => {
  logOut();
})