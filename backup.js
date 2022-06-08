// // --- Always Add to Web remaining tasks first ----

// async function resterendeTakenInDatabase() {
//     const takenInDatabase = await getDataFromDatabase();
//     takenInDatabase.forEach((task) => {
//       if (task.done === "true") {
//         addToWeb(task.description, task._id, task.done);
//       } else {
//         addToWeb(task.description, task._id);
//       }
//     });
//   }
//   resterendeTakenInDatabase();

//   // -------------- Add TASK-ID TO LABEL ----------------

//   async function addIdToLabel() {
//     const idsInDatabase = await getDataFromDatabase();
//     idsInDatabase.forEach((id) => {
//       const lastTaskLabel = document.querySelector(
//         ".todo-items li:last-Child label"
//       );
//       lastTaskLabel.id = id._id;
//     });
//   }

//   // ---------ADD TO WEB - DOM ----------------

//   addToWeb = (taskFromInputField, taskId, completedTask) => {
//     const listItem = document.createElement("li");
//     listItem.setAttribute("class", "list");
//     const listInput = document.createElement("input");
//     listInput.type = "checkbox";
//     listInput.checked = completedTask;
//     const listImage = document.createElement("img");
//     listImage.src = "./img/trashcan.webp";
//     listImage.setAttribute("class", "picture");
//     const listLabel = document.createElement("label");
//     listLabel.innerHTML = `${taskFromInputField}`;
//     listLabel.id = taskId;
//     if (completedTask === "true") {
//       listLabel.classList.add("doorhalen");
//     }
//     const listParent = document.querySelector(".todo-items ul");

//     listParent.appendChild(listItem).appendChild(listImage);
//     listItem.appendChild(listInput);
//     listItem.appendChild(listLabel);

//     inputTasks.value = "";
//   };

//   // --------- EVENTLISTENER ADD BUTTON --------------------

//   const addButton = document.querySelector(".add-btn");
//   const inputTasks = document.querySelector(".task-input-field");
//   // console.log(addButton, inputTasks);
//   addButton.addEventListener("click", () => {
//     if (inputTasks.value !== "") {
//       postTodo(inputTasks.value);
//       addToWeb(inputTasks.value);
//       addIdToLabel();
//     } else {
//       inputTasks.value = "Try again";
//     }
//   });

//   // --------- CLEAR TASK-INPUTSCREEN-----------

//   inputTasks.addEventListener("click", () => (inputTasks.value = ""));

//   //  ----------- EVENTLISTENER TRASHCAN   -----EVENT DELEGATION--------

//   const trashbinUl = document.querySelector(".unordered-tasklist");

//   trashbinUl.addEventListener("click", (e) => {
//     if (e.target && e.target.nodeName == "IMG") {
//       const parent = e.target.parentNode;
//       e.target.parentNode.parentNode.removeChild(e.target.parentNode);
//       const targetId = parent.querySelector("label").id;
//       deleteTask(targetId);
//     }
//   });

//   // ------------ EVENTLISTENER CHECKBOX ---EVENT DELEGATION-------------

//   const checkboxUl = document.querySelector(".unordered-tasklist");

//   checkboxUl.addEventListener("click", (e) => {
//     if (e.target && e.target.nodeName == "INPUT") {
//       const targetLabel = e.target.parentNode.querySelector("label");
//       targetLabel.classList.toggle("doorhalen");

//       if (e.target.parentNode.querySelector("input").checked) {
//         updateValueDB(targetLabel.id, "done", "true");
//       } else {
//         updateValueDB(targetLabel.id, "done", "false");
//       }
//     }
//   });

//-----------------------------------------------------------------------------------------------

//   // --------- POST ---------------------

// postTodo = (task) => {
//     const data = { description: task, done: false };
//     fetch("http://localhost:3000", {
//       method: "POST",
//       body: JSON.stringify(data),
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   };

//   // --------- GET ---------------------

//   async function getDataFromDatabase() {
//     try {
//       const getData = await fetch("http://localhost:3000/", {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//       const data = await getData.json();
//       // console.log(data);
//       return data;
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   // ----------- DELETE --------------------------

//   deleteTask = (id) => {
//     fetch("http://localhost:3000/" + id, {
//       method: "DELETE",
//     });
//   };

//   // ------PUT ---------- SET TASK DATABASE DONE ----------------

//   async function updateValueDB(labelId, key, value) {
//     try {
//       await fetch("http://localhost:3000/" + labelId, {
//         method: "PUT",
//         body: `{"${key}": "${value}"}`,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });
//     } catch (err) {
//       console.log(err);
//     }
//     getDataFromDatabase();
//   }
