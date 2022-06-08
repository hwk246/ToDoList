// ------------ ADD REMAINING TASKS AT START ----

async function remainingTaskInDatabase() {
  const takenInDatabase = await getDataFromDatabase();
  takenInDatabase.forEach((task) => {
    if (task.done) {
      addToWeb(task.description, task._id, true);
    } else {
      addToWeb(task.description, task._id);
    }
  });
}

remainingTaskInDatabase();

// -------------- Add TASK-ID TO LABEL ----------------

async function addIdToLabel(taskname) {
  const idsInDatabase = await getDataFromDatabase();
  const filterCurrentTask = idsInDatabase
    .filter((task) => task.description === `${taskname}`)
    .slice(-1);
  const lastTaskLabel = document.querySelector(
    ".unordered-tasklist .list:last-Child .task-update"
  );
  lastTaskLabel.id = filterCurrentTask[0]._id;
}

// ---------ADD TO WEB - DOM ----------------

addToWeb = (taskFromInputField, taskId, completedTask) => {
  const listItem = document.createElement("li");
  listItem.setAttribute("class", "list");
  const listInput = document.createElement("input");
  listInput.type = "checkbox";
  listInput.checked = completedTask;
  listInput.setAttribute("class", "checkbox");
  const listImage = document.createElement("img");
  listImage.src = "./img/trashcan.webp";
  listImage.setAttribute("class", "picture");
  listImage.id = "trashcan";
  const listLabel = document.createElement("input");
  listLabel.value = `${taskFromInputField}`;
  listLabel.id = taskId;
  listLabel.setAttribute("class", "task-update");
  listLabel.readOnly = true;
  listLabel.type = "text";
  if (completedTask === true) {
    listLabel.classList.add("doorhalen");
  }
  const EditImg = document.createElement("img");
  EditImg.src = "./img/oke.jpg";
  EditImg.setAttribute("class", "editor");
  EditImg.id = "editor";

  const listParent = document.querySelector(".todo-items ul");

  listParent.appendChild(listItem).appendChild(listImage);
  listItem.appendChild(listInput);
  listItem.appendChild(listLabel);
  listItem.appendChild(EditImg);
};

// --------- EVENTLISTENER ADD BUTTON --------------------

const addButton = document.querySelector(".add-btn");
const inputTasks = document.querySelector(".task-input-field");

addButton.addEventListener("click", () => {
  if (inputTasks.value !== "") {
    addToWeb(inputTasks.value);
    postTodo(inputTasks.value);
    addIdToLabel(inputTasks.value);
    inputTasks.value = "";
  } else {
    inputTasks.value = "Try again";
  }
});

// --------- CLEAR TASK-INPUTSCREEN-----------

inputTasks.addEventListener("click", () => (inputTasks.value = ""));

//  ----------- EVENTLISTENER TRASHCAN   -----EVENT DELEGATION--------

const trashbinUl = document.querySelector(".unordered-tasklist");

trashbinUl.addEventListener("click", (e) => {
  if (e.target && e.target.nodeName == "IMG" && e.target.id == "trashcan") {
    const parent = e.target.parentNode;
    e.target.parentNode.parentNode.removeChild(e.target.parentNode);
    const targetId = parent.querySelector("input.task-update").id;
    deleteTask(targetId);
  }
});

// ------------ EVENTLISTENER CHECKBOX ---EVENT DELEGATION-------------

const checkboxUl = document.querySelector(".unordered-tasklist");

checkboxUl.addEventListener("click", (e) => {
  if (e.target && e.target.nodeName == "INPUT" && e.target.type == "checkbox") {
    const targetLabel = e.target.parentNode.querySelector("input.task-update");
    targetLabel.classList.toggle("doorhalen");
    if (e.target.parentNode.querySelector("input").checked) {
      updateValueDB(targetLabel.id, "done", "true");
    } else {
      updateValueDB(targetLabel.id, "done", false);
    }
  }
});

//  ---------- EVENTLISTENER EDIT TEKST ---EVENT  DELEGATION---------

const inputEdit = document.querySelector(".unordered-tasklist");
inputEdit.addEventListener("click", (e) => {
  if (e.target && e.target.nodeName == "INPUT" && e.target.type != "checkbox") {
    e.target.readOnly = false;
    e.target.parentNode.querySelector("img.editor").classList.add("show");
  }
});

//  -----EVENTLISTENER EDIT APROVAL BUTTON --- EVENT DELEGATION ---

const pencilImg = document.querySelector(".unordered-tasklist");
pencilImg.addEventListener("click", (e) => {
  if (e.target && e.target.nodeName == "IMG" && e.target.id == "editor") {
    const editId = e.target.parentNode.querySelector(".task-update").id;
    const editText = e.target.parentNode.querySelector(".task-update").value;
    updateValueDB(editId, "description", `"${editText}"`);
    e.target.parentNode.querySelector("img.editor").classList.remove("show");
  }
});
