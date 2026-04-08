const tasks = [];
let idCounter = 0;

const taskForm = document.getElementById('taskForm');
const taskInput = document.getElementById('taskInput');
const listTasksDiv = document.querySelector('.listTasks');

// Main Function: Add Task
function addTask(event) {
    event.preventDefault(); // Stop form from refreshing the page

    const text = taskInput.value.trim();
    
    if (text === "") return; // Check if input is empty

    // Create task object (Bonus I)
    const taskObj = {
        task_id: idCounter,
        text: text,
        done: false
    };

    tasks.push(taskObj);
    renderTask(taskObj);
    
    taskInput.value = ""; // Clear input
    idCounter++;
}

// Function to render the task to the DOM
function renderTask(task) {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task-item');
    taskDiv.setAttribute('data-task-id', task.task_id);

    // 1. The "X" Button (Bonus II)
    const deleteBtn = document.createElement('i');
    deleteBtn.classList.add('fa-solid', 'fa-xmark');
    deleteBtn.addEventListener('click', () => deleteTask(task.task_id));

    // 2. The Checkbox (Bonus I)
    const checkbox = document.createElement('input');
    checkbox.setAttribute('type', 'checkbox');
    checkbox.addEventListener('change', () => doneTask(task.task_id));

    // 3. The Label
    const label = document.createElement('span');
    label.classList.add('task-text');
    label.innerText = task.text;

    // Append to taskDiv
    taskDiv.appendChild(deleteBtn);
    taskDiv.appendChild(checkbox);
    taskDiv.appendChild(label);

    // Append to main list
    listTasksDiv.appendChild(taskDiv);
}

// Bonus I: Mark task as done
function doneTask(id) {
    const taskIndex = tasks.findIndex(t => t.task_id === id);
    if (taskIndex > -1) {
        // Toggle boolean
        tasks[taskIndex].done = !tasks[taskIndex].done;

        // Toggle CSS class in DOM
        const taskElement = document.querySelector(`[data-task-id="${id}"] .task-text`);
        taskElement.classList.toggle('is-done');
    }
}

// Bonus II: Delete task
function deleteTask(id) {
    // Remove from array
    const taskIndex = tasks.findIndex(t => t.task_id === id);
    if (taskIndex > -1) {
        tasks.splice(taskIndex, 1);
    }

    // Remove from DOM
    const taskElement = document.querySelector(`[data-task-id="${id}"]`);
    taskElement.remove();
}

// Event Listener
taskForm.addEventListener('submit', addTask);