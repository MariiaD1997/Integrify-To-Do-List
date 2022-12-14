// Declaring variables
const inputText = document.querySelector("#input-task");
const inputDeadline = document.querySelector("#deadline");
const inputOption = document.querySelector("#select");
const taskBtn = document.getElementById("add-task-button");
const saveBtn = document.getElementById("save");
const showFormBtn = document.getElementById("show-form-btn");
const cancelButton = document.getElementById("cancel-button");
const form = document.getElementById("input-form");
let borderColor = "";

showFormBtn.style.display = "inline";
saveBtn.style.display = "none";
form.style.display = "none";

showFormBtn.addEventListener("click", (e) => {
  e.preventDefault();
  form.style.display = form.style.display === "block" ? "none" : "block";
});

//create event to hide input form
cancelButton.addEventListener("click", (e) => {
  e.preventDefault();
  form.style.display = "none";
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

// function to create model of new task
const renderItem = (item) => {
  const listItem = document.createElement("li");
  const title = item.name;
  const deadline = item.deadline;
  listItem.innerHTML = `<h4>${title}</h4> <p>Deadline: ${deadline}</p>`;
  switchColor(item);
  listItem.style.borderLeft = `5px solid ${borderColor}`;
  listItem.id = item.id;
  insertEditBtn(listItem, title, deadline, item);
  //move delete button into listItem
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
  listItem.appendChild(deleteButton);
  return listItem;
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
    newTask.id = `${inputText.value}+${inputOption.value}+${inputDeadline.value}`;

    //add object into array
    if (inputText.value !== 0) {
      todoList.push(newTask);
      updateLocalStorage();
    }

    renderList(todoList);

    clearInput();
  }
});

//move edit button to the listItem
const insertEditBtn = (listItem, title, deadline, newTask) => {
  const editButton = document.createElement("button");
  editButton.setAttribute("class", "edit-btn");
  editButton.innerHTML = "EDIT";
  editButton.addEventListener("click", (e) => {
    e.preventDefault();
    saveBtn.style.display = "inline";
    taskBtn.style.display = "none";
    form.style.display = "block";
    inputText.value = newTask.name;
    inputDeadline.value = newTask.deadline;
    editedTask = newTask;
  });

  listItem.appendChild(editButton);
};

//event to save edited todo and update todo list
saveBtn.addEventListener("click", (e) => {
  e.preventDefault();
  todoList.forEach((element) => {
    if (element.id === editedTask.id) {
      editedTask.name = inputText.value;
      editedTask.deadline = inputDeadline.value;
      editedTask.status = inputOption.value;
    }
    renderList(todoList);
    updateLocalStorage();
    clearInput();
  });
});

const clearInput = () => {
  form.style.display = "none";
  inputText.value = "";
  inputDeadline.value = "";
  inputOption.value = "";
};

const switchColor = (item) => {
  switch (item.status) {
    case "done":
      borderColor = "green";
      break;
    case "in progress":
      borderColor = "red";
      break;
    case "not started":
      borderColor = "blue";
      break;
    default:
      borderColor = "green";
  }
};

//mutate array into strings
const updateLocalStorage = () => {
  localStorage.setItem("tasks", JSON.stringify(todoList));
};
