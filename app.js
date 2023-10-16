import { addTodolistToLocalstorage, getTodolistFromLocalStorage, updateCompletedTaskAndAddToLocalstorage } from "./localstorage.js";

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

    checkTab();
    addTodolistToLocalstorage(todoList);
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
    checkCompletedTask();
}

let checkCompletedTask = () => {
    let checkBox = document.querySelectorAll("#todoApp .todoApp-wrapper .task-result .check-completed");
    checkBox.forEach((box) => {
        box.addEventListener("click", function () {
            this.classList.toggle("check-completed-active");
            updateCompletedTaskAndAddToLocalstorage(todoList, this.dataset.id);
            checkTab();
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

let checkTab = () => {
    filterTabsBtns.forEach((btn) => {
        if (btn.classList.contains("filter-tab-active")) {
            if (btn.classList.contains("todo")) {
                filterTodoTasks()
                return
            } else if (btn.classList.contains("completed")) {
                filterCompletedTasks()
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


let initialApp = () => {
    todoList = getTodolistFromLocalStorage();
    diplayTodolist(todoList);
    filterTabs();
    checkTab();

}
initialApp();