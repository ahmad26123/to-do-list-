
// const populateUsers = async (selectElement) => {
//   if (!selectElement) return;

//   try {
//     const users = await getData("http://localhost:3000/users/");
//     users.forEach((user) => {
//       const cOption = document.createElement("option");
//       cOption.value = user.id;
//       cOption.textContent = user.name;
//       selectElement.appendChild(cOption);
//     });
//   } catch (error) {
//     console.error("Failed to load users:", error);
//   }
// };

// // (Dropdown Statements)
// const creatStatmint = (parentContainer, id, currentStatus = "Inactive") => {
//   const statments = ["Inactive", "isLoading", "success"];

//   const colors = {
//     Inactive: "red",
//     isLoading: "blue",
//     success: "green"
//   };

//   const div = document.createElement("div");
//   div.className = "btn-group dropend";

//   const btn = document.createElement("button");
//   btn.className = "btn btn-secondary dropdown-toggle";
//   btn.setAttribute("data-bs-toggle", "dropdown");
//   btn.setAttribute("aria-expanded", "false");
//   btn.textContent = currentStatus;
//   btn.style.backgroundColor = colors[currentStatus] || "red";

//   const ul = document.createElement("ul");
//   ul.className = "dropdown-menu";

//   statments.forEach((statment) => {
//     const li = document.createElement("li");
//     const a = document.createElement("a");
//     a.className = "dropdown-item";
//     a.href = "#";
//     a.textContent = statment;

//     a.addEventListener("click", async (e) => {
//       e.preventDefault();
//       btn.textContent = statment;
//       btn.style.backgroundColor = colors[statment];

//       console.log(id);


//       await fetch(`http://localhost:3000/todos/${id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ status: statment })
//       });
//     });

//     li.appendChild(a);
//     ul.appendChild(li);
//   });

//   div.appendChild(btn);
//   div.appendChild(ul);
//   parentContainer.appendChild(div);
// };

// // (Task Item Builder)
// const addSTask = async (tTitle, uSelec, tDesc, uniqueId, userId) => {
//   const newTodo = {
//     title: tTitle,
//     description: tDesc,
//     userId: userId,
//     status: "Inactive"
//   };

//   return await postData("http://localhost:3000/todos/", newTodo);
// };

// const renderdata = async (url, dad) => {
//   const data = await getData(url);
//   dad.innerHTML = "";

//   for (const e of data) {
//     const tTitle = e.title;
//     const uUrl = "http://localhost:3000/users/";

//     let username = "Unknown User";
//     if (e.userId && e.userId !== "inputGroupSelect01") {
//       const userObj = await getUserById(uUrl, e.userId);
//       if (userObj && userObj.name) {
//         username = userObj.name;
//       }
//     }

//     const uSelec = username;
//     const uniqueId = e.id;
//     const tDesc = e.description;

//     const li = document.createElement("li");
//     li.classList.add("list-group-item", "mb-2");

//     const topRow = document.createElement("div");
//     topRow.classList.add("d-flex", "align-items-center", "justify-content-between", "gap-2", "w-100");

//     // Container الأيسر: زر الحالة + العنوان
//     const leftContainer = document.createElement("div");
//     leftContainer.classList.add("d-flex", "align-items-center", "gap-2");

//     creatStatmint(leftContainer, e.id, e.status);

//     const span = document.createElement("span");
//     span.textContent = `${tTitle} — (User: ${uSelec})`;
//     leftContainer.appendChild(span);

//     // Container الأيمن: يحوي (التفاصيل + التعديل + الحذف)
//     const rightContainer = document.createElement("div");
//     rightContainer.classList.add("d-flex", "align-items-center", "gap-2");

//     // 1. زر التفاصيل
//     const aDescription = document.createElement("a");
//     aDescription.classList.add("btn", "btn-primary", "btn-sm");
//     aDescription.textContent = "Details";
//     aDescription.href = `#${uniqueId}`;
//     aDescription.setAttribute("data-bs-toggle", "collapse");
//     aDescription.setAttribute("role", "button");
//     rightContainer.appendChild(aDescription);

//     // 2. زر التعديل
//     createEditBtn(rightContainer, e, () => renderdata(url, dad));

//     // 3. زر الحذف
//     createDeleteBtn(
//       rightContainer,
//       e.id,
//       () => renderdata(url, dad),
//       typeof toggleEmptyImage !== "undefined" ? toggleEmptyImage : null
//     );

//     topRow.appendChild(leftContainer);
//     topRow.appendChild(rightContainer);
//     li.appendChild(topRow);

//     // قسم التفاصيل المخفي (Collapse)
//     const collapseDiv = document.createElement("div");
//     collapseDiv.classList.add("collapse", "mt-2");
//     collapseDiv.id = uniqueId;

//     const cardBody = document.createElement("div");
//     cardBody.classList.add("card", "card-body", "bg-light", "small");
//     cardBody.textContent = tDesc || "No description provided.";

//     collapseDiv.appendChild(cardBody);
//     li.appendChild(collapseDiv);

//     dad.appendChild(li);
//   }
// };
// // (Edit Button Generator)
// // متغير عام أو محلي لتخزين المعرف الحرفي للمهمة الحالية المراد تعديلها
// let currentEditId = null;

// const createEditBtn = (parentContainer, todo, renderCallback) => {
//   const btn = document.createElement("button");
//   btn.className = "btn btn-warning btn-sm";
//   btn.textContent = "Edit";

//   btn.addEventListener("click", () => {
//     // 1. تخزين ID المهمة المحددة للتعديل
//     currentEditId = todo.id;

//     // 2. تعبئة الحقول بالبيانات الحالية
//     const taskTitleInput = document.querySelector("#task-title input");
//     const taskDescriptionInput = document.querySelector("#task-description textarea");
//     const userSelectElement = document.querySelector("#user-select select");

//     const modalTitle = document.querySelector("#staticBackdrop .modal-title");
//     const submitBtn = document.querySelector("#task-form button[type='submit']");

//     if (taskTitleInput) taskTitleInput.value = todo.title || "";
//     if (taskDescriptionInput) taskDescriptionInput.value = todo.description || "";
//     if (userSelectElement) userSelectElement.value = todo.userId || "";

//     // 3. تغيير النصوص لتوحي بالتعديل
//     if (modalTitle) modalTitle.textContent = "Edit Task";
//     if (submitBtn) submitBtn.textContent = "Save Changes";

//     // 4. إظهار المودال
//     const modalElement = document.getElementById("staticBackdrop");
//     const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
//     modal.show();
//   });

//   parentContainer.appendChild(btn);
// };
// // (Delete Button Generator)
// const createDeleteBtn = (parentContainer, id, renderCallback, toggleImageCallback) => {
//   const btn = document.createElement("button");
//   btn.className = "btn btn-danger btn-sm";
//   btn.textContent = "Delete";

//   btn.addEventListener("click", async () => {
//     // إظهار رسالة تأكيد للحذف
//     const isConfirmed = confirm("Are you sure you want to delete this task?");

//     if (isConfirmed) {
//       try {
//         // إرسال طلب الحذف للسيرفر
//         await fetch(`http://localhost:3000/todos/${id}`, {
//           method: "DELETE"
//         });

//         // إعادة تحميل القائمة وتحديث صورة القائمة الفارغة بعد الحذف الناجح
//         await renderCallback();
//         if (toggleImageCallback) toggleImageCallback();
//       } catch (error) {
//         console.error("Failed to delete task:", error);
//       }
//     }
//   });

//   parentContainer.appendChild(btn);
// };

// document.addEventListener("DOMContentLoaded", async () => {
//   const taskList = document.getElementById("task-list");
//   const emptyImage = document.querySelector(".empty-image");
//   const taskForm = document.getElementById("task-form");
//   const userSelectElement = document.querySelector("#user-select select");

//   taskList.classList.add("list-group", "list-group-flush");

//   const toggleEmptyImage = () => {
//     emptyImage.style.display = taskList.children.length === 0 ? "block" : "none";
//   };

//   await populateUsers(userSelectElement);
//   await renderdata("http://localhost:3000/todos/", taskList);
//   toggleEmptyImage();

//   const addTask = async (event) => {
//     if (event) event.preventDefault();

//     const taskTitleInput = document.querySelector("#task-title input");
//     const taskDescriptionInput = document.querySelector("#task-description textarea");

//     const tTitle = taskTitleInput ? taskTitleInput.value.trim() : "";
//     const tDesc = taskDescriptionInput ? taskDescriptionInput.value.trim() : "";

//     const uSelec = userSelectElement && userSelectElement.selectedIndex !== -1
//       ? userSelectElement.options[userSelectElement.selectedIndex].text
//       : "";

//     if (tTitle === "" || uSelec === "" || uSelec === "Choose...") {
//       alert("Please make sure you entered a task title and selected a user.");
//       return;
//     }

//     const uniqueId = "collapse-" + Date.now();
//     console.log(uniqueId);


//     await addSTask(tTitle, uSelec, tDesc, uniqueId, userSelectElement.value);

//     await renderdata("http://localhost:3000/todos/", taskList);
//     toggleEmptyImage();

//     taskTitleInput.value = "";
//     if (taskDescriptionInput) taskDescriptionInput.value = "";
//     if (userSelectElement) userSelectElement.selectedIndex = 0;

//     const modelE = document.getElementById("staticBackdrop");
//     const modal = bootstrap.Modal.getInstance(modelE);
//     if (modal) {
//       modal.hide();
//     }
//   };

//   if (taskForm) {
//     taskForm.addEventListener("submit", addTask);
//   }
// });

// متغير عام لتخزين ID المهمة المراد تعديلها (يكون null عند الإضافة)
let currentEditId = null;

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
const creatStatmint = (parentContainer, id, currentStatus = "Inactive") => {
  const statments = ["Inactive", "isLoading", "success"];

  const colors = {
    Inactive: "red",
    isLoading: "blue",
    success: "green"
  };

  const div = document.createElement("div");
  div.className = "btn-group dropend";

  const btn = document.createElement("button");
  btn.className = "btn btn-secondary btn-sm dropdown-toggle";
  btn.setAttribute("data-bs-toggle", "dropdown");
  btn.setAttribute("aria-expanded", "false");
  btn.textContent = currentStatus;
  btn.style.backgroundColor = colors[currentStatus] || "red";

  const ul = document.createElement("ul");
  ul.className = "dropdown-menu";

  statments.forEach((statment) => {
    const li = document.createElement("li");
    const a = document.createElement("a");
    a.className = "dropdown-item";
    a.href = "#";
    a.textContent = statment;

    a.addEventListener("click", async (e) => {
      e.preventDefault();
      btn.textContent = statment;
      btn.style.backgroundColor = colors[statment];

      await fetch(`http://localhost:3000/todos/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: statment })
      });
    });

    li.appendChild(a);
    ul.appendChild(li);
  });

  div.appendChild(btn);
  div.appendChild(ul);
  parentContainer.appendChild(div);
};

// (Task Item Builder)
const addSTask = async (tTitle, uSelec, tDesc, uniqueId, userId) => {
  const newTodo = {
    title: tTitle,
    description: tDesc,
    userId: userId,
    status: "Inactive"
  };

  return await postData("http://localhost:3000/todos/", newTodo);
};

const renderdata = async (url, dad) => {
  const data = await getData(url);
  dad.innerHTML = "";

  for (const e of data) {
    const tTitle = e.title;
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
    const tDesc = e.description;

    const li = document.createElement("li");
    li.classList.add("list-group-item", "mb-2", "shadow-sm", "rounded");

    const topRow = document.createElement("div");
    topRow.classList.add("d-flex", "align-items-center", "justify-content-between", "gap-2", "w-100");

    // Container الأيسر: زر الحالة + العنوان
    const leftContainer = document.createElement("div");
    leftContainer.classList.add("d-flex", "align-items-center", "gap-2", "flex-grow-1", "me-2");

    creatStatmint(leftContainer, e.id, e.status);

    const span = document.createElement("span");
    span.classList.add("task-text");
    span.textContent = `${tTitle} — (User: ${uSelec})`;
    leftContainer.appendChild(span);

    // Container الأيمن: يحوي (التفاصيل + التعديل + الحذف)
    const rightContainer = document.createElement("div");
    rightContainer.classList.add("d-flex", "align-items-center", "gap-1", "flex-shrink-0");

    // 1. زر التفاصيل
    const aDescription = document.createElement("a");
    aDescription.classList.add("btn", "btn-primary", "btn-sm");
    aDescription.textContent = "Details";
    aDescription.href = `#collapse-${uniqueId}`;
    aDescription.setAttribute("data-bs-toggle", "collapse");
    aDescription.setAttribute("role", "button");
    rightContainer.appendChild(aDescription);

    // 2. زر التعديل
    createEditBtn(rightContainer, e, () => renderdata(url, dad));

    // 3. زر الحذف
    createDeleteBtn(
      rightContainer,
      e.id,
      () => renderdata(url, dad),
      typeof toggleEmptyImage !== "undefined" ? toggleEmptyImage : null
    );

    topRow.appendChild(leftContainer);
    topRow.appendChild(rightContainer);
    li.appendChild(topRow);

    // قسم التفاصيل المخفي (Collapse)
    const collapseDiv = document.createElement("div");
    collapseDiv.classList.add("collapse", "mt-2");
    collapseDiv.id = `collapse-${uniqueId}`;

    const cardBody = document.createElement("div");
    cardBody.classList.add("card", "card-body", "bg-light", "small");
    cardBody.textContent = tDesc || "No description provided.";

    collapseDiv.appendChild(cardBody);
    li.appendChild(collapseDiv);

    dad.appendChild(li);
  }
};

// (Edit Button Generator)
const createEditBtn = (parentContainer, todo, renderCallback) => {
  const btn = document.createElement("button");
  btn.className = "btn btn-warning btn-sm";
  btn.textContent = "Edit";

  btn.addEventListener("click", () => {
    // 1. تحديد ID المهمة المراد تعديلها
    currentEditId = todo.id;

    // 2. تعبئة بيانات المهمة في عناصر المودال
    const taskTitleInput = document.querySelector("#task-title input");
    const taskDescriptionInput = document.querySelector("#task-description textarea");
    const userSelectElement = document.querySelector("#user-select select");

    const modalTitle = document.querySelector("#staticBackdrop .modal-title");
    const submitBtn = document.querySelector("#task-form button[type='submit']");

    if (taskTitleInput) taskTitleInput.value = todo.title || "";
    if (taskDescriptionInput) taskDescriptionInput.value = todo.description || "";
    if (userSelectElement) userSelectElement.value = todo.userId || "";

    // 3. تغيير نصوص المودال للتعبير عن عملية التعديل
    if (modalTitle) modalTitle.textContent = "Edit Task";
    if (submitBtn) submitBtn.textContent = "Save Changes";

    // 4. إظهار المودال
    const modalElement = document.getElementById("staticBackdrop");
    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
    modal.show();
  });

  parentContainer.appendChild(btn);
};

// (Delete Button Generator)
const createDeleteBtn = (parentContainer, id, renderCallback, toggleImageCallback) => {
  const btn = document.createElement("button");
  btn.className = "btn btn-danger btn-sm";
  btn.textContent = "Delete";

  btn.addEventListener("click", async () => {
    const isConfirmed = confirm("Are you sure you want to delete this task?");

    if (isConfirmed) {
      try {
        await fetch(`http://localhost:3000/todos/${id}`, {
          method: "DELETE"
        });

        await renderCallback();
        if (toggleImageCallback) toggleImageCallback();
      } catch (error) {
        console.error("Failed to delete task:", error);
      }
    }
  });

  parentContainer.appendChild(btn);
};

document.addEventListener("DOMContentLoaded", async () => {
  const taskList = document.getElementById("task-list");
  const emptyImage = document.querySelector(".empty-image");
  const taskForm = document.getElementById("task-form");
  const userSelectElement = document.querySelector("#user-select select");
  const modalElement = document.getElementById("staticBackdrop");

  taskList.classList.add("list-group", "list-group-flush");

  const toggleEmptyImage = () => {
    if (emptyImage) {
      emptyImage.style.display = taskList.children.length === 0 ? "block" : "none";
    }
  };

  await populateUsers(userSelectElement);
  await renderdata("http://localhost:3000/todos/", taskList);
  toggleEmptyImage();

  // إعادة ضبط المودال تلقائياً لوضع "الإضافة" عند إغلاقه أو فتح زر الإضافة
  if (modalElement) {
    modalElement.addEventListener("hidden.bs.modal", () => {
      currentEditId = null;
      if (taskForm) taskForm.reset();

      const modalTitle = document.querySelector("#staticBackdrop .modal-title");
      const submitBtn = document.querySelector("#task-form button[type='submit']");

      if (modalTitle) modalTitle.textContent = "Add Task";
      if (submitBtn) submitBtn.textContent = "Add";
    });
  }

  // دالة موحدة لمعالجة إرسال الفورم (سواء للإضافة أو للتعديل)
  const handleFormSubmit = async (event) => {
    if (event) event.preventDefault();

    const taskTitleInput = document.querySelector("#task-title input");
    const taskDescriptionInput = document.querySelector("#task-description textarea");

    const tTitle = taskTitleInput ? taskTitleInput.value.trim() : "";
    const tDesc = taskDescriptionInput ? taskDescriptionInput.value.trim() : "";
    const userId = userSelectElement ? userSelectElement.value : "";

    if (tTitle === "" || userId === "" || userId === "Choose...") {
      alert("Please make sure you entered a task title and selected a user.");
      return;
    }

    // إذا كان currentEditId يحتوي على قيمة -> تنفيذ التعديل (PATCH)
    if (currentEditId) {
      const updatedTodo = {
        title: tTitle,
        description: tDesc,
        userId: userId
      };

      await fetch(`http://localhost:3000/todos/${currentEditId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTodo)
      });

      currentEditId = null;
    }
    // إذا كان currentEditId يساوي null -> تنفيذ الإضافة (POST)
    else {
      const uniqueId = "collapse-" + Date.now();
      const uSelec = userSelectElement.options[userSelectElement.selectedIndex].text;
      await addSTask(tTitle, uSelec, tDesc, uniqueId, userId);
    }

    // إعادة رسم البيانات وإغلاق المودال
    await renderdata("http://localhost:3000/todos/", taskList);
    toggleEmptyImage();

    const modal = bootstrap.Modal.getInstance(modalElement);
    if (modal) {
      modal.hide();
    }
  };

  if (taskForm) {
    taskForm.addEventListener("submit", handleFormSubmit);
  }
});