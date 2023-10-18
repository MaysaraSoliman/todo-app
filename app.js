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
        todoAppResults.innerHTML += ` <div class="task-result"  draggable="true">
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
    dragAndDrop();
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



function dragAndDrop() {
    const srotAbleResultsList = document.querySelector("#todoApp .container .todoApp-wrapper .results");

    const items = document.querySelectorAll("#todoApp .container .todoApp-wrapper .results .task-result");

    items.forEach((item) => {
        item.addEventListener("dragstart", () => {
            setTimeout(() => {
                item.classList.add("dragging");
            }, 0)
            item.addEventListener("dragend", () => item.classList.remove("dragging"))
        })
    })

    const intiSortAbleResultsList = (e) => {
        const draggingItem = srotAbleResultsList.querySelector(".dragging");
        let siblings = [...srotAbleResultsList.querySelectorAll(".task-result:not(.dragging)")];
        let nextSibling = siblings.find(sibiling => {
            return e.clientY <= sibiling.offsetTop + sibiling.offsetHeight / 2;
        })
        srotAbleResultsList.insertBefore(draggingItem, nextSibling);
        saveAfterDragging();
    }
    srotAbleResultsList.addEventListener("dragover", intiSortAbleResultsList)
}


function saveAfterDragging() {
    let newTodoList = [];
    let tabAll = document.querySelector("#todoApp .todoApp-wrapper .filters .all");
    if (tabAll.classList.contains("filter-tab-active")) {
        let todoListAfterDrag = todoAppResults.querySelectorAll(".task-result .check-completed");
        for (let i = 0; i < todoListAfterDrag.length; i++) {
            for (let j = 0; j < todoList.length; j++) {
                if (todoListAfterDrag[i].dataset.id == todoList[j].id) {
                    newTodoList.push(todoList[j])
                }
            }
        }
        todoList = newTodoList;
        addTodolistToLocalstorage(todoList);
    }
}

