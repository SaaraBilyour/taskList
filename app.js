// Define UI Variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//load all event listeners
loadEventListeners();

function loadEventListeners() {
    //DOM load event
    document.addEventListener('DOMContentLoaded', getTasks);
    //Add task event
    form.addEventListener("submit", addTask);
    //remove task event
    taskList.addEventListener('click', removeTask);
    //clear all tasks
    clearBtn.addEventListener('click', clearTasks);
    //Filter tasks event 
    filter.addEventListener('keyup', filterTasks);

}

//Get tasks from local Storage
function getTasks() {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function (task) {
        const li = document.createElement('li');
        li.className = 'collection-item';
        li.appendChild(document.createTextNode(task));
        const link = document.createElement('a');
        link.className = 'delete-item';
        link.innerHTML = '<i class="fa fa-remove secondary-content"></i>';
        li.appendChild(link);
        taskList.appendChild(li);
    });
}

function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task')
    }
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(taskInput.value));
    const link = document.createElement('a');
    link.className = 'delete-item';
    link.innerHTML = '<i class="fa fa-remove secondary-content"></i>';
    li.appendChild(link);
    taskList.appendChild(li);
    //console.log(link.parentElement);
    
    //store in local storage
    storeTaskInLocalStorage(taskInput.value);
    taskInput.value = '';
    e.preventDefault();
}

//Store Task in local storage
function storeTaskInLocalStorage(task) {
    let tasks;
    if (localStorage.getItem('tasks') === null) {
        tasks = [];
    } else {
        //local storage only store string so convert to Jason
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
    // we want to get the parent element of the <i> which is <a>
    // to remove the task list when we click X
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure?')) {
            // remove the <li> tag
            e.target.parentElement.parentElement.remove();

            //remove from local storage
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
     }
    
}
//Remove from local storage
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if (localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function (task,index) {
        if (taskItem.textContent === task) {
            tasks.splice(index, 1);
        }
    })
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks() {
    // We can clear all tasks by deleting <ul> values 
    //taskList.innerHTML = '';
    
    //or we can use loop
    // while there is a first child
    while (taskList.firstChild) { 
        taskList.removeChild(taskList.firstChild);
    }

    clearTasksFromLocalStorage();
}

function clearTasksFromLocalStorage() {
    localStorage.clear();
}
// filter tasks to get matching task to what has been typed in filter input 
function filterTasks(e) {
    const text = e.target.value.toLowerCase();

    //Remebre querySelector return a node list so we can use forEach
    // if we use getelementbyclass then it will return html collection > convert to array > then use forEach
    document.querySelectorAll('.collection-item').forEach
        (function (task) {
        const item = task.firstChild.textContent;
        if (item.toLowerCase().indexOf(text) != -1) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}