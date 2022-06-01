import utilities from '/utilities.js';
import ls from '/ls.js';

loadTodos();

//listeners
document.querySelector('#addBtn').onclick = addNewTodo;
document.querySelector('#activeFilter').onclick = applyFilter;
document.querySelector('#allFilter').onclick = applyFilter;
document.querySelector('#completedFilter').onclick = applyFilter;

const input = document.querySelector('#todoInput');

input.addEventListener('keypress', e => {
    if (e.keyCode == '13') addNewTodo();
})

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
    completeBtn.setAttribute('data-id', todo.id);
    completeBtn.classList.add('complete-btn');
    completeBtn.addEventListener('click', toggleCheckbox);

    const todoContent = document.createElement('div');
    todoContent.innerText = todo.content;
    todoContent.classList.add('todo-content');

    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('data-id', todo.id);
    deleteBtn.classList.add('todo-delete-btn');
    deleteBtn.innerText = "X";
    deleteBtn.onclick = deleteTodo;
    
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
    let checkedBox = document.querySelectorAll('input[type="checkbox"]');
    if (checkedBox.checked){
        checkedBox.setAttribute('checked', true);
    }
    
}

function applyFilter(e) {
    document.querySelector('#todos').innerHTML = '';
    let result = document.getElementById('count');
    
    let filteredTodos = [];
    const allTodos = ls.getTodoList();

    result.setAttribute('count', allTodos.length);
    document.querySelector('#count').innerHTML = allTodos.length;

    if (e.currentTarget.id == 'activeFilter') {
        filteredTodos = utilities.activeFilter(allTodos);
    } else if (e.currentTarget.id == 'allFilter') {
        filteredTodos = allTodos;
    } else if (e.currentTarget.id == 'completedFilter'){
        filteredTodos = toggleCheckbox(ls.updateTodo(allTodos));
    }

    if (filteredTodos.length != 0) {
        result.setAttribute('count', filteredTodos.length);
        document.querySelector('#count').innerHTML = filteredTodos.length;
    }
    
    console.log(result);

    filteredTodos.forEach( todo => {
        const el = createTodoItem(todo);
        addToList(el);
    })
}
