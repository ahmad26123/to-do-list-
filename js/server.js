const url = "http://localhost:3000/users/";

const userData = {
  name: "Ammar",
  email: "ammarfarha@gmail.com",
};

// POST
export const postData = async (url, data) => {
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
export const getData = async (url) => {
  try {
    const resp = await fetch(url);

    if (!resp.ok) {
      throw new Error(`HTTP Error: ${resp.status}`);
    }

    const result = await resp.json();
    console.log("GET:", result);
    return result;
  } catch (error) {
    console.error("Server Error:", error);
  }
};

// PUT
export const putData = async (url, data) => {
  try {
    const resp = await fetch(url, {
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

// DELETE
export const deleteData = async (url) => {
  try {
    const resp = await fetch(url, {
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



// POST
postData(url, userData);

// GET
getData(url);

// PUT
putData(`${url}1`, {
  name: "Ammar Updated",
  email: "ammar.updated@gmail.com",
});

// DELETE
deleteData(`${url}1`);