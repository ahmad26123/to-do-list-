const url = "http://localhost:3000/users/";

const userData = {
  name: "Ammar",
  email: "ammarfarha@gmail.com",
};

// POST
 const postData = async (url, data) => {
  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!resp.ok) {
      throw new Error(`HTTP Error: ${resp.status}`);
    }

    const result = await resp.json();
    console.log("POST:", result);
    return result;
  } catch (error) {
    console.error("Server Error:", error);
  }
};

// GET
 const getData = async (url) => {
  try {
    const resp = await fetch(url);

    if (!resp.ok) {
      throw new Error(`HTTP Error: ${resp.status}`);
    }

    const result = await resp.json();
    // console.log("GET:", result);
    return result;
  } catch (error) {
    console.error("Server Error:", error);
  }
};

// const getUserNameById = async (userId) => {
//   try {
//     const response = await fetch(`http://localhost:3000/users/${userId}`);
//     if (!response.ok) throw new Error("User not found");

//     const user = await response.json();
//     return user.name; // يرجع اسم المستخدم مباشرة (مثلاً: "Ammar")
//   } catch (error) {
//     console.error("Error fetching user:", error);
//   }
// };

const getUserById = async (url, userId) => {
  return fetch(url + userId).then((response) => {
    if (!response.ok) throw new Error("User not found")
    return response.json();
  }).catch((error) => {
    console.log("Error fetching user :" + error)
  });
}

// PUT
const putData = async (baseUrl, id, data) => {
  try {
    const resp = await fetch(`${baseUrl}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!resp.ok) {
      throw new Error(`HTTP Error: ${resp.status}`);
    }

    const result = await resp.json();
    console.log("PUT:", result);
    return result;
  } catch (error) {
    console.error("Server Error:", error);
  }
};

// طريقة الاستدعاء الجديدة:
// putData("http://localhost:3000/users", user.id, updatedData);
// DELETE
const deleteData = async (baseUrl, id) => {
  try {
    const resp = await fetch(`${baseUrl}/${id}`, {
      method: "DELETE",
    });

    if (!resp.ok) {
      throw new Error(`HTTP Error: ${resp.status}`);
    }

    const result = await resp.json();
    console.log("DELETE:", result);
    return result;
  } catch (error) {
    console.error("Server Error:", error);
  }
};

// الاستدعاء الجديد يصبح هكذا:
// deleteData("http://localhost:3000/users", user.id);


// POST
// postData(url, userData);

// // GET
// getData(url);

// // PUT
// putData(`${url}1`, {
//   name: "Ammar Updated",
//   email: "ammar.updated@gmail.com",
// });

// // DELETE
// deleteData(`${url}1`);