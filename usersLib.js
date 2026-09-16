const users = [
  {
    userName: "Mark",
    firstName: "Mark",
    lastName: "Otto",
    gamil: "mark@gmail.com",
    password: "123456",
  },

  {
    userName: "Jacob",
    firstName: "Jacob",
    lastName: "Thornton",
    gamil: "jacob@gmail.com",
    password: "123456",
  },

  {
    userName: "John",
    firstName: "John",
    lastName: "Doe",
    gamil: "john@gmail.com",
    password: "123456",
  },
];



const tableBody = document.querySelector("tbody");

users.forEach((user, index) => {
  const row = document.createElement("tr");

  row.innerHTML = `
        <th>${index + 1}</th>
        <td>${user.userName}</td>
        <td>${user.firstName}</td>
        <td>${user.lastName}</td>
        <td>${user.gamil}</td>
        <td>${user.password}</td>
    `;

  tableBody.appendChild(row);
});

const usersButton = document.querySelector("#usersButton");
const usersMenu = document.querySelector("#usersMenu");

// Create buttons for users

users.forEach((user) => {
  const button = document.createElement("button");

  button.classList.add("user-button");

  button.textContent = user.userName;

  usersMenu.appendChild(button);
});


