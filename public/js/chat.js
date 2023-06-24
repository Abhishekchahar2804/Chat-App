const chat = document.querySelector(".send");

chat.addEventListener("click", addChat);

async function addChat(e) {
  e.preventDefault();

  const chat = document.getElementById("chat").value;
  const obj = {
    message: chat,
  };

  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "http://localhost:4000/chat/message",
      obj,
      { headers: { Authorization: token } }
    );
    console.log(response.data);
  } catch (err) {
    console.log(err);
  }
}
