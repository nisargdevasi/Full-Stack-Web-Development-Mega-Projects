// Select elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

// Add Task Event
addTaskBtn.addEventListener("click", addTask);

// Function to Add Task
function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task!");
    return;
  }

  // Create task item
  const taskItem = document.createElement("li");
  taskItem.className = "task-item";
  taskItem.innerHTML = `
    <span>${taskText}</span>
    <div>
      <button class="complete-btn">✔</button>
      <button class="delete-btn">✖</button>
    </div>
  `;

  // Append to task list
  taskList.appendChild(taskItem);

  // Clear input
  taskInput.value = "";

  // Add event listeners to buttons
  taskItem.querySelector(".complete-btn").addEventListener("click", () => {
    taskItem.classList.toggle("completed");
  });

  taskItem.querySelector(".delete-btn").addEventListener("click", () => {
    taskItem.remove();
  });
}