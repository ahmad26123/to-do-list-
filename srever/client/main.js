const url = "http://localhost:3000/users/";

const userData = {
  name: "Ammar",
  email: "ammarfarha@gmail.com",
};

fetch(url)
  .then((res) => res.json())
  .then((data) => console.log(data));

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
      throw new Error(resp.status);
    }
    const result = await resp.json();
    console.log(result);
  } catch (error) {
    console.error("server Error", error);
  }
};

postData(url, userData);
