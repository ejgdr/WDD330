import utilities from '/utilities.js';
import ls from '/ls.js';

document.querySelector('#addBtn').onclick = addNewTodo;

const input = document.querySelector('#todoInput');

input.addEventListener('keypress', e => {
    if (e.keyCode == '13') addNewTodo();
})

loadTodos();

function addNewTodo(e) {
    const todo = {id: Date.now(), content: input.value, completed: false};
    input.value = '';

    const todoItem =createTodoItem(todo);

    ls.saveTodo(todo);

    loadTodos();
}

function createTodoItem(todo) {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    const completeBtn = document.createElement('button');
    completeBtn.setAttribute('data-id', todo.id);
    completeBtn.classList.add('complete-btn');

    const todoContent = document.createElement('div');
    todoContent.innerText = todo.content;
    todoContent.classList.add('todo-content');

    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('data-id', todo.id);
    deleteBtn.innerText = "X";
    deleteBtn.onclick = deleteTodo;
    deleteBtn.classList.add('todo-delete-btn');
    
    todoDiv.appendChild(completeBtn);
    todoDiv.appendChild(todoContent);
    todoDiv.appendChild(deleteBtn);

    return todoDiv;
}

function addToList(todoDiv) {
    document.querySelector('#todos').appendChild(todoDiv);
}

function loadTodos() {
    document.querySelector('#todos').innerHTML = '';
    const todoList = ls.getTodoList();

    console.log(todoList)

    todoList.forEach(todo => {
        const el = createTodoItem(todo)
        addToList(el)
    })
}

function deleteTodo(e) {
    const todoId = e.currentTarget.getAttribute('data-id');
    ls.deleteTodo(todoId);
    loadTodos();
}

// window.addEventListener('load', () => {
//     toDos =JSON.parse(localStorage.getItem('toDos') || []);
//     const newToDos = document.querySelector('#new-task');
//     const toDosList = document.querySelector('#tasks-list');

//     newToDos.addEventListener('submit', e =>{
//         e.preventDefault();

//         const todo = {
//             newInput: e.target.elements.new-task-input.value,
//             done: false,
//             createdAt: new Date().getTime()
//         }

//         toDos.push(todo);

//         localStorage.setItem('toDos', JSON.stringify(toDos));

//         e.target.reset();
//     })
    
// })