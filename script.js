const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Function to update local storage with tasks
function updateLocalStorage() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to add a new task
function newElement() {
  var inputValue = document.getElementById("myInput").value;
  if (inputValue.trim() === '') {
    alert("You must write something!");
    return;
  }

  var li = document.createElement("li");
  
  var textSpan = document.createElement("span");
  textSpan.textContent = inputValue;
  li.appendChild(textSpan);
  li.appendChild(document.createElement("br")); // New line

  var createdAt = new Date().toLocaleString();
  var createdAtSpan = document.createElement("span");
  createdAtSpan.className = "createdAt";
  createdAtSpan.textContent = "Created: " + createdAt;
  li.appendChild(createdAtSpan);
  li.appendChild(document.createElement("br")); // New line

  var updatedAtSpan = document.createElement("span");
  updatedAtSpan.className = "updatedAt";
  li.appendChild(updatedAtSpan);

  var deleteBtn = document.createElement("button");
  deleteBtn.className = "delete";
  deleteBtn.innerText = "Delete";
  li.appendChild(deleteBtn);

  var editBtn = document.createElement("button");
  editBtn.className = "edit";
  editBtn.innerText = "Edit";
  li.appendChild(editBtn);

  // Add functionality to the new delete button
  deleteBtn.onclick = function() {
    var listItem = this.parentElement;
    var taskIndex = Array.from(listItem.parentElement.children).indexOf(listItem);
    tasks.splice(taskIndex, 1);
    updateLocalStorage();
    listItem.remove();
  }

  // Add functionality to the edit button
  editBtn.onclick = function() {
    var listItem = this.parentElement;
    var textElement = listItem.querySelector('span:first-child');
    var currentText = textElement.textContent;
    var newText = prompt("Edit your task:", currentText.trim());
    if (newText !== null && newText.trim() !== '') {
      textElement.textContent = newText.trim();
      var taskIndex = Array.from(listItem.parentElement.children).indexOf(listItem);
      tasks[taskIndex].text = newText.trim();
      
      tasks[taskIndex].updatedAt = new Date().toLocaleString();
      listItem.querySelector('.updatedAt').textContent = "Last edited: " + tasks[taskIndex].updatedAt;
      updateLocalStorage();
    }
  }

  document.getElementById("myUL").prepend(li);

  tasks.unshift({
    text: inputValue,
    createdAt: createdAt,
    updatedAt: ""
  });
  updateLocalStorage();

  document.getElementById("myInput").value = "";
}

// Function to toggle task completion
function toggleTaskCompletion(li) {
  if (li.classList.contains("checked")) {
    li.classList.remove("checked");
    document.getElementById("myUL").prepend(li); // Move task to the top
  } else {
    li.classList.add("checked");
    alert("Task \"" + tasks[Array.from(li.parentElement.children).indexOf(li)].text + "\" is completed!");
    document.getElementById("myUL").appendChild(li); // Move task to the end
  }
}

// Display tasks from local storage on page load
window.onload = function() {
  tasks.forEach(function(task) {
    var li = document.createElement("li");

    var textSpan = document.createElement("span");
    textSpan.textContent = task.text;
    li.appendChild(textSpan);
    li.appendChild(document.createElement("br")); // New line

    var createdAtSpan = document.createElement("span");
    createdAtSpan.className = "createdAt";
    createdAtSpan.textContent = "Created: " + task.createdAt;
    li.appendChild(createdAtSpan);
    li.appendChild(document.createElement("br")); // New line

    var updatedAtSpan = document.createElement("span");
    updatedAtSpan.className = "updatedAt";
    if (task.updatedAt !== "") {
      updatedAtSpan.textContent = "Last edited: " + task.updatedAt;
    }
    li.appendChild(updatedAtSpan);

    var deleteBtn = document.createElement("button");
    deleteBtn.className = "delete";
    deleteBtn.innerText = "Delete";
    li.appendChild(deleteBtn);

    var editBtn = document.createElement("button");
    editBtn.className = "edit";
    editBtn.innerText = "Edit";
    li.appendChild(editBtn);

    // Add functionality to mark/unmark task as completed when clicked
    li.addEventListener("click", function() {
      toggleTaskCompletion(li);
    });

    // Add functionality to the new delete button
    deleteBtn.onclick = function() {
      var listItem = this.parentElement;
      var taskIndex = Array.from(listItem.parentElement.children).indexOf(listItem);
      tasks.splice(taskIndex, 1);
      updateLocalStorage();
      listItem.remove();
    }

    // Add functionality to the edit button
    editBtn.onclick = function() {
      var listItem = this.parentElement;
      var textElement = listItem.querySelector('span:first-child');
      var currentText = textElement.textContent;
      var newText = prompt("Edit your task:", currentText.trim());
      if (newText !== null && newText.trim() !== '') {
        textElement.textContent = newText.trim();
        var taskIndex = Array.from(listItem.parentElement.children).indexOf(listItem);
        tasks[taskIndex].text = newText.trim();
        tasks[taskIndex].updatedAt = new Date().toLocaleString();
        listItem.querySelector('.updatedAt').textContent = "Last edited: " + tasks[taskIndex].updatedAt;
        updateLocalStorage();
      }
    }

    document.getElementById("myUL").appendChild(li);
  });
};
