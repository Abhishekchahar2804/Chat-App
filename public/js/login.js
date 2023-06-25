const login = document.querySelector(".login");

login.addEventListener("click", AleradyUser);

async function AleradyUser(e) {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const obj = {
    email: email,
    password: password,
  };
  // console.log(obj);
  try {
    const response = await axios.post(
      "http://localhost:4000/user/login/login-user",
      obj
    );
    alert(response.data.message);
    localStorage.setItem('token',response.data.token);
    // console.log(response.data.token);
    const data=await axios.get('/chat/all-chats',{ headers: { Authorization: response.data.token } });
    const chatArr=[];
    const allChats = data.data;
    let n=allChats.length;
    for(let i=n-5|0;i<n;i++){
      chatArr.push(allChats[i])
    }
    localStorage.setItem('chats',JSON.stringify(chatArr));
    window.location.href="/chat/";
  } catch (err) {
    console.log(err);
    document.getElementById("err").innerText = err.response.data.message;
  }
}