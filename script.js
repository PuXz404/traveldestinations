const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
			<input type="text" value="${task}" onchange="updateTask(${index}, this.value)">
			<button onclick="deleteTask(${index})">Delete</button>
		`;
    taskList.appendChild(li);
  });
}

function addTask(event) {
  event.preventDefault();

  const newTaskInput = document.getElementById("new-task");
  const newTask = newTaskInput.value.trim();

  if (newTask === "") {
    return;
  }

  tasks.push(newTask);
  saveTasks();
  renderTasks();
  newTaskInput.value = "";
}

function deleteTask(index) {
  if (confirm("Are you sure you want to delete this task?")) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
  }
}

function updateTask(index, newValue) {
  if (confirm("Are you sure you want to update this task?")) {
    tasks[index] = newValue;
    saveTasks();
    renderTasks();
  }
}

taskForm.addEventListener("submit", addTask);

renderTasks();
