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
    const uSelec = userSelect ? userSelect.value.trim() : "";

    if (tTitle === "" || uSelec === "" || uSelec === "Choose...") {
      alert("Please make sure you entered a task title and selected a user.");
      return;
    }

    const li = document.createElement("li");
    li.classList.add(
      "list-group-item",
      "d-flex",
      "align-items-center",
      "justify-content-between",
    );

    const leftcontainer = document.createElement("div");

    // const aDiscripion = document.createElement("a");
    // aDiscripion.classList.add("btn", "btn-primary");
    // aDiscripion.href = "#multiCollapseExample1";

    const uniqued = "collapse-" + Date.now();

    const aDescription = document.createElement("a");
    aDescription.classList.add("btn", "btn-sm", "btn-outline-primary");
    aDescription.textContent = "Details";

    // --- الخصائص المهمة لـ Bootstrap ---
    aDescription.setAttribute("href", `#${uniqueId}`);
    aDiscripion.setAttribute("data-bs-toggle", "collapse");
    aDiscripion.setAttribute("role", "button");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "form-check-input me-2";

    const span = document.createElement("span");
    span.textContent = `${tTitle} — (User: ${uSelec})`;

    leftcontainer.appendChild(checkbox);
    leftcontainer.appendChild(span);
    // li.appendChild(aDisripion);
    li.appendChild(leftcontainer);

    // taskDescriptionInput = document.querySelector("#task-description textarea");
    const tDesc = taskDescriptionInput ? taskDescriptionInput.value.trim() : "";

    const collapseDiv = document.createElement("div");
    collapseDiv.classList.add("collapse", "mt-2");
    collapseDiv.id = uniqueId;

    const cardBody = document.createElement("div");
    cardBody.classList.add("card", "card-body", "bg-light", "small");
    cardBody.textContent = tDesc || "لا يوجد وصف لهذه المهمة";

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
