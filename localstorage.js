let getTodolistFromLocalStorage = () => {
    let todoList = localStorage.getItem("todo")
    if (localStorage.getItem("todo")) {
        return JSON.parse(todoList)
    }
    return []
}

let addTodolistToLocalstorage = (todoList) => {
    return window.localStorage.setItem("todo", JSON.stringify(todoList));
}

export { addTodolistToLocalstorage, getTodolistFromLocalStorage }
