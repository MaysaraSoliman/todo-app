// import { addTodolistToLocalstorage, getTodolistFromLocalStorage } from "./localstorage.js";

let todoList = [];
let todoAppResults = document.querySelector("#todoApp .container .todoApp-wrapper .results");
let filterTabsBtns = document.querySelectorAll("#todoApp .todoApp-wrapper .filters .filter-tab");

let todoApp = () => {
    let form = document.querySelector("#todoApp .todoApp-wrapper .form");
    let taskInput = document.querySelector("#todoApp .todoApp-wrapper .form .task-input");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        if (taskInput.value != "") {
            addTaskToArray(taskInput.value.toLowerCase())
        }
        taskInput.value = "";
    })
}
todoApp()

let addTaskToArray = (inputValue) => {
    let todoObject = {
        id: Date.now(),
        title: inputValue,
        createdAt: new Date().toLocaleString(),
        completed: false,
    }
    todoList.push(todoObject);
    diplayTodolist(todoList);
    filterTabs();
    checkTab();
    addTodolistToLocalstorage();
}

let checkCompletedTaskAndAddToLocalstorage = () => {
    let checkBox = document.querySelectorAll("#todoApp .todoApp-wrapper .task-result .check-completed");
    checkBox.forEach((box) => {
        box.addEventListener("click", function () {
            this.classList.toggle("check-completed-active");
            let todoObject = todoList.find((task) => {
                return task.id == this.dataset.id;
            })
            if (todoObject.completed) {
                todoObject.completed = false;
                checkTab();
                addTodolistToLocalstorage();
                return
            }
            todoObject.completed = true;
            checkTab();
            addTodolistToLocalstorage();
        })
    })
}

let filterTabs = () => {
    filterTabsBtns.forEach((tab) => {
        tab.addEventListener("click", function () {
            filterTabsBtns.forEach((tab) => {
                tab.classList.remove("filter-tab-active");
            })
            this.classList.add("filter-tab-active");
            checkTab();
        })
    })
}
filterTabs()

let checkTab = () => {
    filterTabsBtns.forEach((btn) => {
        if (btn.classList.contains("filter-tab-active")) {
            if (btn.classList.contains("todo")) {
                filterTodoTasks();
                return
            } else if (btn.classList.contains("completed")) {
                filterCompletedTasks();
                return
            }
            diplayTodolist(todoList);
        }
    })
}

let filterTodoTasks = () => {
    let todoTasks = todoList.filter((todoTasks) => {
        return todoTasks.completed == false;
    })
    diplayTodolist(todoTasks);
}

let filterCompletedTasks = () => {
    let completedTasks = todoList.filter((completedTasks) => {
        return completedTasks.completed == true;
    })
    diplayTodolist(completedTasks);
}

let diplayTodolist = (todoList) => {
    todoAppResults.innerHTML = "";
    todoList.forEach((task) => {
        todoAppResults.innerHTML += ` <div class="task-result">
        <div class="info">
          <p>${task.title}</p>
          <span>${task.createdAt}</span>
        </div>
        ${(task.completed) ?
                `<div class="check-completed check-completed-active" data-id="${task.id}"></div>`
                :
                `<div class="check-completed " data-id="${task.id}"></div>`
            }
      </div>`
    })
    checkCompletedTaskAndAddToLocalstorage();
}

let getTodolistFromLocalStorage = () => {
    if (localStorage.getItem("todo")) {
        todoList = JSON.parse(localStorage.getItem("todo"));
        diplayTodolist(todoList);
        filterTabs();
        checkTab();
        console.log(todoList)
        return
    }
    []
}
getTodolistFromLocalStorage();

function addTodolistToLocalstorage() {
    window.localStorage.setItem("todo", JSON.stringify(todoList));
}