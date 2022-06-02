const TODO_LIST = "todoList";

function getTodoList() {
    let todoListString = localStorage.getItem(TODO_LIST);

    let todoList = [];

    if (todoListString) {
        todoList = JSON.parse(todoListString);
    }

    return todoList;
}

function saveTodo(todo) {
    let todoList = getTodoList();

    todoList.push(todo);

    localStorage.setItem(TODO_LIST, JSON.stringify(todoList));
}

function deleteTodo(id) {
    const todoList = getTodoList();

    let updatedList = todoList.filter(todo => todo.id != id);

    localStorage.setItem(TODO_LIST, JSON.stringify(updatedList));
}

function updateTodo (id) {
    let todoList = getTodoList();

    let updatedTodo = todoList.filter(todo => todo.id == id);
    
    updatedTodo[0].completed = true;
    
    localStorage.setItem(TODO_LIST, JSON.stringify(todoList));    
}

function updateBack (id) {
    let todoList = getTodoList();

    let updatedTodo = todoList.filter(todo => todo.id == id);
    
    updatedTodo[0].completed = false;
    
    localStorage.setItem(TODO_LIST, JSON.stringify(todoList));    
}

export default {
    saveTodo,
    deleteTodo,
    getTodoList,
    updateTodo,
    updateBack
}