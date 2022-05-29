import utilities from '/utilities.js';
import ls from '/ls.js';

//listeners
document.querySelector('#addBtn').onclick = addNewTodo;
document.querySelector('#allFilter').onclick = applyFilter;
document.querySelector('#activeFilter').onclick = applyFilter;
document.querySelector('#completedFilter').onclick = applyFilter;

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

    const completeBtn = document.createElement('input');
    completeBtn.type = 'checkbox';
    completeBtn.onClick = toggleCheckbox;
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
    const todoList = ls.getTodoList();
    document.querySelector('#todos').innerHTML = '';
    todoList.forEach(todo => {
        const el = createTodoItem(todo)
        addToList(el)
    })
}

function deleteTodo(e) {
    const todoId = e.currentTarget;
    ls.deleteTodo(todoId.getAttribute('data-id'));
    document.querySelector('#todos').innerHTML = '';
    loadTodos();
}

function toggleCheckbox() {
    var x = document.getElementById("complete-btn");
    if (!x.checked) {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
}

function applyFilter(e) {
    document.querySelector('#todos').innerHTML = '';

    let filteredTodos = [];
    const allTodos = ls.getTodoList();

    if (e.currentTarget.id == 'activeFilter') {
        filteredTodos = utilities.activeFilter(allTodos);
    } else if (e.currentTarget.id == 'allFilter') {
        filteredTodos = allTodos;
    } else if (e.currentTarget.id == 'completedFilter'){
        filteredTodos = utilities.completedFilter(allTodos);
    }

    let result = document.getElementById('count');
    if (filteredTodos.length != 0) {
        result.setAttribute('count', filteredTodos.length);
    } else {
        result.setAttribute('count', 0); 
    }
    console.log(result);

    filteredTodos.forEach( todo => {
        const el = createTodoItem(todo);
        addToList(el);
    })
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