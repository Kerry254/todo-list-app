// ---- Step 1: Set up our starting data ----
// We keep all tasks in one array (a list).
// Each task is an object with an id, a title, and whether it's done.
let tasks = [];

// ---- Step 2: Load saved tasks (if any) when the page opens ----
function loadTasks() {
  let saved = localStorage.getItem("myTasks");
  if (saved !== null) {
    tasks = JSON.parse(saved);
  }
  renderTasks();
}

// ---- Step 3: Save tasks to the browser so they aren't lost on refresh ----
function saveTasks() {
  localStorage.setItem("myTasks", JSON.stringify(tasks));
}

// ---- Step 4: Draw (render) the task list on the page ----
function renderTasks() {
  let list = document.getElementById("taskList");
  list.innerHTML = ""; // clear the old list first

  // Loop through every task and create an <li> for it
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];

    let item = document.createElement("li");
    item.className = task.done ? "task done" : "task";

    // Checkbox to mark task as done/not done
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.onclick = function () {
      toggleDone(task.id);
    };

    // Text showing the task title
    let text = document.createElement("span");
    text.textContent = task.title;

    // Delete button
    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✕";
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = function () {
      deleteTask(task.id);
    };

    item.appendChild(checkbox);
    item.appendChild(text);
    item.appendChild(deleteBtn);
    list.appendChild(item);
  }

  saveTasks();
}

// ---- Step 5: Add a new task ----
function addTask(title) {
  let newTask = {
    id: Date.now(), // a simple unique id based on current time
    title: title,
    done: false
  };
  tasks.push(newTask);
  renderTasks();
}

// ---- Step 6: Mark a task done or not done ----
function toggleDone(id) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks[i].done = !tasks[i].done;
    }
  }
  renderTasks();
}

// ---- Step 7: Delete a task ----
function deleteTask(id) {
  let newTasks = [];
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id !== id) {
      newTasks.push(tasks[i]);
    }
  }
  tasks = newTasks;
  renderTasks();
}

// ---- Step 8: Handle the "Add" form submit ----
document.getElementById("taskForm").addEventListener("submit", function (e) {
  e.preventDefault(); // stop the page from reloading
  let input = document.getElementById("taskInput");
  let title = input.value.trim();

  if (title !== "") {
    addTask(title);
    input.value = ""; // clear the input box
  }
});

// ---- Step 9: Dark mode / Light mode toggle ----
function toggleTheme() {
  document.body.classList.toggle("dark");

  let isDark = document.body.classList.contains("dark");
  localStorage.setItem("darkMode", isDark);
  updateThemeButton(isDark);
}

function updateThemeButton(isDark) {
  let btn = document.getElementById("themeBtn");
  btn.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
}

function loadTheme() {
  let isDark = localStorage.getItem("darkMode") === "true";
  if (isDark) {
    document.body.classList.add("dark");
  }
  updateThemeButton(isDark);
}

// ---- Step 10: Run everything when the page loads ----
loadTheme();
loadTasks();