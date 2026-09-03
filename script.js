// ---- Step 0: Where our fake API lives ----
// json-server is running this address and watching db.json.
// Every task lives at API_URL, and one specific task is API_URL + "/" + id
const API_URL = "http://localhost:3000/tasks";
// Step 1: Set up our starting data 
// tasks now just holds whatever the last fetch() returned from the server.
let tasks = [];

// Step 2: Load tasks FROM THE SERVER when the page opens 
async function loadTasks() {
  try {
    let response = await fetch(API_URL);   // ask the server for all tasks
    tasks = await response.json();          // turn the response into a JS array
    renderTasks();
  } catch (error) {
    console.log("Could not load tasks. Is json-server running?", error);
  }
}

// Step 3: Draw (render) the task list on the page 
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
}


// Step 4: Add a new task(sent to server)
async function addTask(title) {
  let newTask = { title: title, done: false };
 
  await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTask)
  });
 
  loadTasks(); // refresh list from the server so it includes the new task
}

// Step 5: Mark a task done or not done(update it ON the server)
async function toggleDone(id, currentDone) {
  await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ done: !currentDone })
  });
 
  loadTasks();
}

//Step 6: Delete a task(remove it FROM the server)
async function deleteTask(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });
 
  loadTasks();
}

//Step 7: Handle the "Add" form submit
document.getElementById("taskForm").addEventListener("submit", function (e) {
  e.preventDefault(); // stop the page from reloading
  let input = document.getElementById("taskInput");
  let title = input.value.trim();

  if (title !== "") {
    addTask(title);
    input.value = ""; // clear the input box
  }
});

// Step 8: Dark mode / Light mode toggle 
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

//Step 9: Company directory
// Fetches companies AND users, then shows each company with its own
// team listed underneath — matched using each user's companyId field.
async function loadCompanies() {
  try {
    let companiesResponse = await fetch("http://localhost:3000/companies");
    let usersResponse = await fetch("http://localhost:3000/users");
 
    let companies = await companiesResponse.json();
    let users = await usersResponse.json();
 
    renderCompanies(companies, users);
  } catch (error) {
    console.log("Could not load companies/users. Is json-server running?", error);
  }
}
function renderCompanies(companies, users) {
  let container = document.getElementById("companyList");
  container.innerHTML = "";
 
  for (let i = 0; i < companies.length; i++) {
    let company = companies[i];
 
    // Find every user whose companyId matches this company's id
    let team = [];
    for (let j = 0; j < users.length; j++) {
      if (users[j].companyId === company.id) {
        team.push(users[j]);
      }
    }
 
    let card = document.createElement("div");
    card.className = "company-card";
 
    let name = document.createElement("h3");
    name.textContent = company.name;
 
    let description = document.createElement("p");
    description.textContent = company.description;
 
    let teamList = document.createElement("ul");
    if (team.length === 0) {
      let empty = document.createElement("li");
      empty.textContent = "No users yet";
      teamList.appendChild(empty);
    } else {
      for (let k = 0; k < team.length; k++) {
        let member = document.createElement("li");
        member.textContent = `${team[k].firstName} ${team[k].lastName} (${team[k].email})`;
        teamList.appendChild(member);
      }
    }
 
    card.appendChild(name);
    card.appendChild(description);
    card.appendChild(teamList);
    container.appendChild(card);
  }
}
 
// Step 10: Run everything when the page loads 
loadTheme();
loadTasks();
loadCompanies();