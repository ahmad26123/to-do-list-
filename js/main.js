// prin the users and add it to the list 
const populateUsers = async (selectElement) => {
  if (!selectElement) return;

  try {
    const users = await getData("http://localhost:3000/users/");
    users.forEach((user) => {
      const cOption = document.createElement("option");
      cOption.value = user.id;
      cOption.textContent = user.name;
      selectElement.appendChild(cOption);
    });
  } catch (error) {
    console.error("Failed to load users:", error);
  }
};

// (Dropdown Statements)
const creatStatmint = (parentContainer) => {
  const statments = ["statment 1", "statment 2", "statment 3"];

  const div = document.createElement("div");
  div.className = "btn-group dropend";

  const btn = document.createElement("button");
  btn.className = "btn btn-secondary dropdown-toggle";
  btn.setAttribute("data-bs-toggle", "dropdown");
  btn.setAttribute("aria-expanded", "false");
  btn.textContent = statments[0];
  btn.style.backgroundColor = "red";

  const ul = document.createElement("ul");
  ul.className = "dropdown-menu";

  statments.forEach((statment) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.className = "dropdown-item";
    a.href = "#";
    a.textContent = statment;

    a.addEventListener("click", (e) => {
      e.preventDefault();
      btn.textContent = statment;

      switch (statment) {
        case "statment 1":
          btn.style.backgroundColor = "red";
          a.textContent = "Inactive";

          break;
        case "statment 2":
          btn.style.backgroundColor = "blue";
          a.textContent = "isLoading";

          break;
        case "statment 3":
          btn.style.backgroundColor = "green";
          a.textContent = "success";
          break;
      }
    });

    li.appendChild(a);
    ul.appendChild(li);
  });

  div.appendChild(btn);
  div.appendChild(ul);
  parentContainer.appendChild(div);
};

// (Task Item Builder)
const createTaskElement = (tTitle, uSelec, tDesc, uniqueId, userId) => {
  //const data = [tTitle, uSelec, tDesc, uniqueId];
  const newTodo = {
    title: tTitle,
    description: tDesc,
    userId: userId,
    status: "Inactive"
  };

  // postData("http://localhost:3000/todos/", newTodo);
  // const li = document.createElement("li");
  // li.classList.add("list-group-item", "mb-2");


  // const topRow = document.createElement("div");
  // topRow.classList.add("d-flex", "align-items-center", "justify-content-between");

  // const leftContainer = document.createElement("div");
  // leftContainer.classList.add("d-flex", "align-items-center", "gap-2");
  // creatStatmint(leftContainer);

  // const span = document.createElement("span");
  // span.textContent = `${tTitle} — (User: ${uSelec})`;
  // leftContainer.appendChild(span);

  // const aDescription = document.createElement("a");
  // aDescription.classList.add("btn", "btn-primary", "btn-sm");
  // aDescription.textContent = "Details";
  // aDescription.href = `#${uniqueId}`;
  // aDescription.setAttribute("data-bs-toggle", "collapse");
  // aDescription.setAttribute("role", "button");

  // topRow.appendChild(leftContainer);
  // topRow.appendChild(aDescription);
  // li.appendChild(topRow);

  // // (description Collapse Section)
  // const collapseDiv = document.createElement("div");
  // collapseDiv.classList.add("collapse", "mt-2");
  // collapseDiv.id = uniqueId;

  // const cardBody = document.createElement("div");
  // cardBody.classList.add("card", "card-body", "bg-light", "small");
  // cardBody.textContent = tDesc || "No description provided.";

  // collapseDiv.appendChild(cardBody);
  // li.appendChild(collapseDiv);

  // return li;
};

const renderdata = async (url,dad) => {
  const data = await getData(url);
  // console.log("Fetched Todos:", todos);
  // tTitle, uSelec, tDesc, uniqueId, userId
  data.forEach(async (e) => {
    const tTitle = e.title;
    console.log(e.userId)
    const uUrl = "http://localhost:3000/users/";

    let username = "Unknown User";
    if (e.userId && e.userId !== "inputGroupSelect01") {
      const userObj = await getUserById(uUrl, e.userId);
      if (userObj && userObj.name) {
        username = userObj.name; 
      }
    }

    const uSelec = username;
    const uniqueId = e.id; 
    getData("http://localhost:3000/users/")
    const tDesc = e.description; 

    const li = document.createElement("li");
    li.classList.add("list-group-item", "mb-2");


    const topRow = document.createElement("div");
    topRow.classList.add("d-flex", "align-items-center", "justify-content-between");

    const leftContainer = document.createElement("div");
    leftContainer.classList.add("d-flex", "align-items-center", "gap-2");
    creatStatmint(leftContainer);

    const span = document.createElement("span");
    span.textContent = `${tTitle} — (User: ${uSelec})`;
    leftContainer.appendChild(span);

    const aDescription = document.createElement("a");
    aDescription.classList.add("btn", "btn-primary", "btn-sm");
    aDescription.textContent = "Details";
    aDescription.href = `#${uniqueId}`;
    aDescription.setAttribute("data-bs-toggle", "collapse");
    aDescription.setAttribute("role", "button");

    topRow.appendChild(leftContainer);
    topRow.appendChild(aDescription);
    li.appendChild(topRow);

    // (description Collapse Section)
    const collapseDiv = document.createElement("div");
    collapseDiv.classList.add("collapse", "mt-2");
    collapseDiv.id = uniqueId;

    const cardBody = document.createElement("div");
    cardBody.classList.add("card", "card-body", "bg-light", "small");
    cardBody.textContent = tDesc || "No description provided.";

    collapseDiv.appendChild(cardBody);
    li.appendChild(collapseDiv);

    dad.appendChild(li);
  })
}


document.addEventListener("DOMContentLoaded", async () => {

  
  const taskList = document.getElementById("task-list");
  const emptyImage = document.querySelector(".empty-image");
  const taskForm = document.getElementById("task-form");
  const userSelectElement = document.querySelector("#user-select select");
  renderdata("http://localhost:3000/todos/", taskList);
  
  taskList.classList.add("list-group", "list-group-flush");

  
  const toggleEmptyImage = () => {
    emptyImage.style.display = taskList.children.length === 0 ? "block" : "none";
  };

  // const rendertask = (url) => {
  //   const arruTask = getData(url);
  //   console.log(arruTask);
    
  //   // arruTask.array.forEach(element => {
      
  //   // });

  // };

  
  await populateUsers(userSelectElement);

  
  const addTask = (event) => {
    if (event) event.preventDefault();

    const taskTitleInput = document.querySelector("#task-title input");
    const taskDescriptionInput = document.querySelector("#task-description textarea");

    const tTitle = taskTitleInput ? taskTitleInput.value.trim() : "";
    const tDesc = taskDescriptionInput ? taskDescriptionInput.value.trim() : "";

    
    const uSelec = userSelectElement && userSelectElement.selectedIndex !== -1
      ? userSelectElement.options[userSelectElement.selectedIndex].text
      : "";

    
    if (tTitle === "" || uSelec === "" || uSelec === "Choose...") {
      alert("Please make sure you entered a task title and selected a user.");
      return;
    }

    
    const uniqueId = "collapse-" + Date.now();
    console.log(uniqueId);
    const taskElement = createTaskElement(tTitle, uSelec, tDesc, uniqueId, userSelectElement.id);

    taskList.appendChild(taskElement);
    toggleEmptyImage();

    
    taskTitleInput.value = "";
    if (taskDescriptionInput) taskDescriptionInput.value = "";
    if (userSelectElement) userSelectElement.selectedIndex = 0;

    
    const modelE = document.getElementById("staticBackdrop");
    const modal = bootstrap.Modal.getInstance(modelE);
    if (modal) {
      modal.hide();
    }
  };

  if (taskForm) {
    taskForm.addEventListener("submit", addTask);
  }
});