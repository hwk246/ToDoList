// --------------- POST ---------------------

postTodo = (task) => {
  const data = { description: task, done: false };
  fetch("http://localhost:3000", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// -------------- GET ---------------------

async function getDataFromDatabase() {
  try {
    const getData = await fetch("http://localhost:3000/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await getData.json();
    // console.log(data);
    return data;
  } catch (err) {
    console.log(err);
  }
}

// ----------- DELETE --------------------------

deleteTask = (id) => {
  fetch("http://localhost:3000/" + id, {
    method: "DELETE",
  });
};

// ------------------ PUT ----------------------

async function updateValueDB(labelId, key, value) {
  try {
    await fetch("http://localhost:3000/" + labelId, {
      method: "PUT",
      body: `{"${key}": ${value}}`,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (err) {
    console.log(err);
  }
  getDataFromDatabase();
}
