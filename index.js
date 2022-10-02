// Declaring variables
const inputText = document.querySelector("#input-task");
const inputDeadline = document.querySelector("#deadline");
const inputOption = document.querySelector("#select");
const taskBtn = document.getElementById("add-task-button");
const showFormBtn = document.getElementById("show-form-btn");
const cancelButton = document.getElementById("cancel-button");

document.getElementById("input-form").style.display = "none";

//create event to show input form
showFormBtn.addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("input-form").style.display = "flex";
});

//create event to hide input form
cancelButton.addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("input-form").style.display = "none";
  showFormBtn.style.display = "block";
});

//create array
let todoList = [];

//retrieve task list as an array
const loadLocalStorage = () => {
  if (localStorage.getItem("tasks")) {
    todoList = JSON.parse(localStorage.getItem("tasks")) || [];
    renderList(todoList);
  }
};

//make event which load js after html without waiting for css, images etc
document.addEventListener("DOMContentLoaded", () => {
  loadLocalStorage();
});

//create function which would show us tasks
const renderList = (todoList) => {
  //prevent dublicates
  const list = document.querySelector("#task-list");
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }

  //make foreach loop to add new tasks into list
  todoList.forEach((item) => {
    const rendered = renderItem(item);
    list.appendChild(rendered);
  });
};

//create function to make model of new task
const renderItem = (item) => {
  const makeLi = document.createElement("li");

  //move input into list
  const title = document.createElement("span");
  title.setAttribute("class", "todo-title");
  title.innerHTML = item.name;
  makeLi.append(title);

  //move deadline into list
  const deadline = document.createElement("span");
  deadline.setAttribute("class", "todo-deadline");
  deadline.innerHTML = `Deadline: ${item.deadline}`;
  makeLi.appendChild(deadline);

  //move selected option into list
  const option = document.createElement("span");
  option.setAttribute("class", "todo-status");
  option.innerHTML = item.status;

  //move edit button into list
  const editButton = document.createElement("button");
  editButton.setAttribute("class", "edit-btn");
  editButton.innerHTML = "EDIT";
  makeLi.appendChild(editButton);

  //move delete button into list
  const deleteButton = document.createElement("button");
  deleteButton.setAttribute("class", "delete-btn");
  deleteButton.innerHTML = "DELETE";
  deleteButton.addEventListener("click", (e) => {
    const index = todoList.indexOf(item);
    if (index !== -1) {
      todoList.splice(index, 1);
    }
    updateLocalStorage();
    renderList(todoList);
  });
  makeLi.appendChild(deleteButton);
  return makeLi;
};

//create button to add new tasks
taskBtn.addEventListener("click", (e) => {
  if (inputText.value !== "") {
    e.preventDefault();

    //create object and its properties
    let newTask = {};
    newTask.name = inputText.value;
    newTask.deadline = inputDeadline.value;
    newTask.status = inputOption.value;

    //add object into array
    if (inputText.value !== 0) {
      todoList.push(newTask);
      updateLocalStorage();
    }

    renderList(todoList);

    //  clear input
    inputText.value = "";
    deadline.value = "";
  }
});

//mutate array into strings
const updateLocalStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(todoList));
};
