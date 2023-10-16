const getTodolistFromLocalStorage = () => {
    let todoList = localStorage.getItem("todo")
    if (localStorage.getItem("todo")) {
        return JSON.parse(todoList)
    }
    return []
}

const addTodolistToLocalstorage = (todoList) => {
    return window.localStorage.setItem("todo", JSON.stringify(todoList));
}

const updateCompletedTaskAndAddToLocalstorage = (todoList, checkBoxBtnId) => {
    let todoObject = todoList.find((task) => {
        return task.id == checkBoxBtnId;
    })
    todoObject.completed = !todoObject.completed;
    addTodolistToLocalstorage(todoList);
}

export { addTodolistToLocalstorage, getTodolistFromLocalStorage, updateCompletedTaskAndAddToLocalstorage }
