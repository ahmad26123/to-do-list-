// const { createElement } = require("react");

document.addEventListener("DOMContentLoaded", () => {
  const taskList = document.getElementById("task-list");
  taskList.classList.add("list-group", "list-group-flush");

  const emptyImage = document.querySelector(".empty-image");
  const taskForm = document.getElementById("task-form");


  const toggleEmptyImage = () => {
    emptyImage.style.display =
      taskList.children.length === 0 ? "block" : "none";
  };

  const addTask = (event) => {
    if (event) event.preventDefault();

    const taskTitleInput = document.querySelector("#task-title input");
    const taskDescriptionInput = document.querySelector(
      "#task-description textarea",
    );
    const userSelect = document.querySelector("#user-select select");

    const tTitle = taskTitleInput ? taskTitleInput.value.trim() : "";
    const tDesc = taskDescriptionInput ? taskDescriptionInput.value.trim() : "";
    const uSelec = userSelect ? userSelect.value.trim() : "";

    if (tTitle === "" || uSelec === "" || uSelec === "Choose...") {
      alert("Please make sure you entered a task title and selected a user.");
      return;
    }

    const uniqueId = "collapse-" + Date.now();

    const li = document.createElement("li");
    li.classList.add("list-group-item", "mb-2");

    const topRow = document.createElement("div");
    topRow.classList.add(
      "d-flex",
      "align-items-center",
      "justify-content-between",
    );

    const leftcontainer = document.createElement("div");

    // const checkbox = document.createElement("input");
    // checkbox.type = "checkbox";
    // checkbox.className = "form-check-input me-2";
    const statment = creatStatmint(leftcontainer);

    const span = document.createElement("span");
    span.textContent = `${tTitle} — (User: ${uSelec})`;

    // leftcontainer.appendChild(checkbox);
    leftcontainer.appendChild(span);
    leftcontainer.classList.add("d-flex", "align-items-center", "gap-2");

    const aDiscripion = document.createElement("a");
    aDiscripion.classList.add("btn", "btn-primary", "btn-sm");
    aDiscripion.textContent = "Details";
    aDiscripion.href = `#${uniqueId}`;
    aDiscripion.setAttribute("data-bs-toggle", "collapse");
    aDiscripion.setAttribute("role", "button");

    topRow.appendChild(leftcontainer);
    topRow.appendChild(aDiscripion);
    li.appendChild(topRow);

    const collapseDiv = document.createElement("div");
    collapseDiv.classList.add("collapse", "mt-2");
    collapseDiv.id = uniqueId;

    const cardBody = document.createElement("div");
    cardBody.classList.add("card", "card-body", "bg-light", "small");
    cardBody.textContent = tDesc || "No description provided.";

    collapseDiv.appendChild(cardBody);
    li.appendChild(collapseDiv);

    taskList.appendChild(li);
    toggleEmptyImage();

    taskTitleInput.value = "";
    if (taskDescriptionInput) taskDescriptionInput.value = "";
    userSelect.selectedIndex = 0;

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

const creatStatmint = (dad) => {
  const statments = [
    "statment 1",
    "statment 2",
    "statment 3",
  ];
  const div = document.createElement("div");
  div.className = "btn-group dropend";
  const btn = document.createElement("button");
  btn.className = "btn btn-secondary dropdown-toggle";
  btn.setAttribute('data-bs-toggle', 'dropdown');
  btn.setAttribute('aria-expanded', 'false');

  const ul = document.createElement("ul");
  ul.className = "dropdown-menu";

  statments.forEach((statment) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.className = "dropdown-item";
    a.href = "#";
    a.textContent = statment;
    li.appendChild(a);
    ul.appendChild(li);
  });
  console.log(ul);
  div.appendChild(btn);
  div.appendChild(ul);
  dad.appendChild(div);
  return statments[0]; // Return the first statement as the default
  console.log(statments.values());

};
