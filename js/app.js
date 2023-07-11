const $ = document;
const input = $.getElementById("todo-input");
const addTodoBtn = $.querySelector(".add-todo-btn");
const todoList = $.querySelector(".todos");
const clearAllTodos = $.querySelector(".clear-todo-list");
let tasks = [];
let taskData;

window.addEventListener("load", () => {
  tasks = JSON.parse(localStorage.getItem("tasks"));

  if (tasks) {
    tasks.forEach(function (task) {
      let taskText = task.content;
      let taskStatus = task.status;

      let taskElement = document.createElement("div");
      let taskContent = document.createElement("p");

      taskContent.className = "todo-content";
      taskContent.innerHTML = taskText;
      let taskButtons = document.createElement("div");
      taskButtons.className = "todo-butttons";
      // complete button
      let completeBtn = document.createElement("div");
      if (taskStatus === "complete") {
        console.log("kamel shodeh");
        completeBtn.className = "incomplete-todo";
        completeBtn.innerHTML = "incomplete";
        taskElement.className = "todo complete";
      } else {
        completeBtn.className = "complete-todo";
        completeBtn.innerHTML = "complete";
        taskElement.className = "todo";
      }
      // delete button
      let deleteBtn = document.createElement("div");
      deleteBtn.className = "delete-todo";
      deleteBtn.innerHTML = "Delete";
      // buttons wrapper
      taskButtons.append(completeBtn, deleteBtn);

      taskElement.append(taskContent, taskButtons);
      todoList.append(taskElement);
    });
  } else {
    tasks = [];
  }
});

/*----------------------------- add todo ----------------------------------*/
input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    addTodoItem();
  }
});

addTodoBtn.addEventListener("click", () => {
  addTodoItem();
});

function addTodoItem() {
  if (input.value) {
    let inputValue = input.value;
    let todoElement = document.createElement("div");
    todoElement.className = "todo";
    todoElement.innerHTML = `
    <p class="todo-content">${inputValue}</p>
    <div class="todo-butttons">
      <div class="complete-todo">Complete</div>
      <div class="delete-todo">Delete</div>
    </div>
    `;
    todoList.appendChild(todoElement);
    input.value = "";

    taskData = {
      content: inputValue,
      status: "incomplete",
    };
    tasks.push(taskData);
    // save data of task in local storage
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } else {
    input.classList.add("input-error");
    setTimeout(() => {
      input.classList.remove("input-error");
    }, 500);
  }
}

/*--------------------- complete and incomplete and delete todo item ---------------------*/
todoList.addEventListener("click", (e) => {
  if (e.target.classList.contains("complete-todo")) {
    // complete the task
    e.target.className = "incomplete-todo";
    e.target.textContent = "incomplete";
    e.target.parentElement.parentElement.classList.add("complete");
    let taskIndex = tasks.findIndex(function (task) {
      return (
        task.content ===
        e.target.parentElement.parentElement.firstElementChild.innerHTML
      );
    });
    tasks[taskIndex].status = "complete";
    localStorage.setItem("tasks", JSON.stringify(tasks));
  } else if (e.target.classList.contains("incomplete-todo")) {
    // incomplete the task
    e.target.className = "complete-todo";
    e.target.textContent = "complete";
    e.target.parentElement.parentElement.classList.remove("complete");
    let taskIndex = tasks.findIndex(function (task) {
      return (
        task.content ===
        e.target.parentElement.parentElement.firstElementChild.innerHTML
      );
    });
    tasks[taskIndex].status = "incomplete";
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // delete todo
  if (e.target.classList.contains("delete-todo")) {
    e.target.parentElement.parentElement.classList.add("remove-todo-anim");
    setTimeout(() => {
      e.target.parentElement.parentElement.remove();
    }, 600);
    let taskIndex = tasks.findIndex(function (task) {
      return (
        task.content ===
        e.target.parentElement.parentElement.firstElementChild.innerHTML
      );
    });
    tasks.splice(taskIndex, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});

/*---------------- clear all todo items from localstorage ----------------*/
clearAllTodos.addEventListener("click", function () {
  localStorage.setItem("tasks", []);
  todoList.innerHTML = "";
});
