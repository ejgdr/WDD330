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
    completeBtn.classList.add("complete-btn");
    completeBtn.onclick = changeCompleted;
   
    const todoContent = document.createElement('div');
    todoContent.innerText = todo.content;
    todoContent.classList.add('todo-content');

    if(todo.completed) {
        completeBtn.setAttribute('checked', true);
        todoContent.classList.add('contentChecked');
    }

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
    if (todoList.length != 0) {
        document.querySelector('#count').innerHTML = todoList.length;
    }
    
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

function changeCompleted(e) {
    const todoInfo = e.currentTarget;

    ls.updateTodo(todoInfo.getAttribute('data-id'));
    
    let todoList = ls.getTodoList();
    if (todoList.length != 0) {
        document.querySelector('#count').innerHTML = todoList.length--;
    }
}

// function changeBack(e){
//     const todoInfo = e.currentTarget;
//     ls.updateBack(todoInfo.getAttribute('data-id'));
    
//     const todoList = ls.getTodoList();
//     if (todoList.length != 0) {
//         document.querySelector('#count').innerHTML = todoList.length + 1;
//     }
// }

// function toggleChange(e){
//     const todoInfo = e.currentTarget;
//     if (todoInfo.getAttribute('checked' == true)) {
//         changeCompleted(e);
//     } else {
//         changeBack(e);
//     }
// }

function applyFilter(e) {
    document.querySelector('#todos').innerHTML = '';
    
    let filteredTodos = [];
    const allTodos = ls.getTodoList();
    
    if (e.currentTarget.id == 'activeFilter') {
        filteredTodos = utilities.activeFilter(allTodos);
        if (filteredTodos.length != 0) {
            document.querySelector('#count').innerHTML = filteredTodos.length;
        }
    } else if (e.currentTarget.id == 'allFilter') {
        filteredTodos = allTodos;
    } else if (e.currentTarget.id == 'completedFilter'){
        filteredTodos = utilities.completedFilter(allTodos);
    }

    filteredTodos.forEach( todo => {
        const el = createTodoItem(todo);
        addToList(el);
    })
}