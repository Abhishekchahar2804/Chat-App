var socket = io();

socket.on("message-recived", (data) => {
  let li = document.createElement("li");
  li.innerHTML = `${data.username} ${data.message}`;
  ul.append(li);
});

const chat = document.querySelector(".send");
const ul = document.getElementById("users");
const groups = document.getElementById("groups");
const create = document.querySelector(".create");
const addOradmin = document.getElementById("addOradmin");
const selectUser = document.getElementById("select-user");
const selectGroup = document.getElementById("select-group");
const addUser = document.getElementById("add-user");
const adminUser = document.getElementById("admin-user");
const groupChatBox = document.getElementById("chat-group");

let localChats = [];

chat.addEventListener("click", addChat);
create.addEventListener("click", addGroup);

async function addChat(e) {
  e.preventDefault();

  const chat = document.getElementById("chat").value;
  const obj = {
    message: chat,
  };

  try {
    const token = localStorage.getItem("token");
    const response = await axios.post(
      "http://3.95.214.198:4000/chat/message",
      obj,
      { headers: { Authorization: token } }
    );
    console.log(response.data);
    if (localChats.length == 5) {
      localChats.shift();
    }
    localChats.push(response.data.chat);
    socket.emit("message-sent", response.data.chat);
    localStorage.setItem("chats", JSON.stringify(localChats));
    let li = document.createElement("li");
    li.innerHTML =
      response.data.chat.username + " - " + response.data.chat.message;
    ul.appendChild(li);
    // allChats();
    chat.value = "";
  } catch (err) {
    console.log(err);
  }
}

async function addGroup(e) {
  e.preventDefault();
  try {
    const group = document.getElementById("group").value;
    const obj = {
      group: group,
    };
    const token = localStorage.getItem("token");
    const createGroup = await axios.post(
      "http://3.95.214.198:4000/group/create",
      obj,
      { headers: { Authorization: token } }
    );
    const li = document.createElement("li");
    li.innerHTML = `<button id=${createGroup.data.newGroup.id}> ${createGroup.data.newGroup.group} </button>`;
    groups.appendChild(li);
    //   document.getElementById(createGroup.data.newGroup.id).addEventListener('click',() => {
    //     joinGroup(createGroup.data.newGroup.id);
    // })
  } catch (err) {
    console.log(err);
  }
}

async function joinGroup(id) {}

// function allChats(){
//   let token = localStorage.getItem('token');
//   axios.get('/chat/all-chats',{ headers: { Authorization: token }})
//   .then((data) => {
//       console.log(data.data);
//       for(let d of data.data){
//           let li = document.createElement('li');
//           li.innerHTML = d.username+" - "+d.message;
//           ul.appendChild(li);
//       }
//   })
//   .catch(() => {
//       alert('something not right');
//   })
// }

// setInterval(()=>{
//     allChats();
// },1000)

window.addEventListener("DOMContentLoaded", async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get("http://3.95.214.198:4000/chat/all-user", {
      headers: { Authorization: token },
    });
    // console.log(response.data);
    showOnScreen(response.data.user);
    localChats = JSON.parse(localStorage.getItem("chats"));
    if (localChats) {
      getChats(localChats);
    }
  } catch (err) {
    console.log(err);
  }
});

async function getGroups() {
  try {
    const token = localStorage.getItem("token");
    const allGroups = await axios.get("http://3.95.214.198:4000/group/all", {
      headers: { Authorization: token },
    });

    const getAllGroups = allGroups.data.allGroups;
    const getAdminGroups = allGroups.data.groupsWithAdmin;
    console.log("getAdminGroups: ", getAdminGroups);

    for (let grp of getAllGroups) {
      console.log("group are: ", grp);
      let li = document.createElement("li");
      li.innerHTML = `<button id=${grp.id}> ${grp.group} </button>`;
      groups.append(li);
      document.getElementById(grp.id).addEventListener("click", () => {
        groupChat(grp.id);
      });
    }

    for (let grp of getAdminGroups) {
      let opt = document.createElement("option");
      opt.value = grp.group;
      opt.innerHTML = grp.group;
      selectGroup.append(opt);
    }
  } catch (err) {
    console.log(err);
  }
}

async function groupChat(id) {
  try {
    groupChatBox.style = "visibility: visible;";
    document.getElementById("chat-one").style = "visibility: hidden;";
    const token = localStorage.getItem("token");
    const grpChats = await axios.get(
      "http://3.95.214.198:4000/group/group-chat/" + id,
      { headers: { Authorization: token } }
    );

    const listItems = document.querySelectorAll("#users li");
    console.log(listItems);
    listItems.forEach((listItem) => {
      listItem.parentNode.removeChild(listItem);
    });

    const chatsFromGrp = grpChats.data;

    for (let chat of chatsFromGrp) {
      let li = document.createElement("li");
      li.innerHTML = chat.message;
      ul.append(li);
    }
  } catch (err) {
    console.log(err);
  }
}

async function getUsers() {
  try {
    const token = localStorage.getItem("token");
    const allUsers = await axios.get("http://3.95.214.198:4000/chat/all-user", {
      headers: { Authorization: token },
    });
    let usersData = allUsers.data.user;
    // console.log(usersData);
    for (let user of usersData) {
      let opt = document.createElement("option");
      opt.value = user.name;
      opt.innerHTML = user.name;
      selectUser.append(opt);
    }
  } catch (err) {
    console.log(err);
  }
}

groupChatBox.addEventListener("submit", async (e) => {
  e.preventDefault();
  let chat = document.querySelector('#chat-group input[type="text"]').value;
  const token = localStorage.getItem("token");
  const sendGrpChat = await axios.post(
    "/group/sendchat/",
    { message: chat },
    { headers: { Authorization: token } }
  );
  console.log(sendGrpChat.data);
  socket.emit("message-sent", sendGrpChat.data.sendchat.message);
  let li = document.createElement("li");
  li.innerHTML = sendGrpChat.data.sendChat.message;
  ul.append(li);
});

addUser.addEventListener("click", async () => {
  if (selectUser.value != "" && selectGroup.value != "") {
    const token = localStorage.getItem("token");
    const addUserToGroup = await axios.post(
      "/group/adduser/" + selectUser.value,
      { group: selectGroup.value },
      { headers: { Authorization: token } }
    );
    console.log(addUserToGroup);
  } else {
    console.log("Empty select");
  }
});

adminUser.addEventListener("click", async () => {
  try {
    if (selectUser.value != "" && selectGroup.value != "") {
      const token = localStorage.getItem("token");
      const addAdminToGroup = await axios.post(
        "/group/adminuser/" + selectUser.value,
        { group: selectGroup.value },
        { headers: { Authorization: token } }
      );
      console.log(addAdminToGroup);
    } else {
      console.log("Empty select");
    }
  } catch (error) {
    console.log("Some error: ", error);
  }
});

const getChats = (chats) => {
  for (let chat of chats) {
    let li = document.createElement("li");
    li.innerHTML = chat.username + " - " + chat.message;
    ul.appendChild(li);
  }
  getGroups();
  getUsers();
};
function showOnScreen(data) {
  console.log(data);
  for (let d of data) {
    // console.log(d.name);
    let li = document.createElement("li");
    li.innerText = d.name;
    ul.appendChild(li);
  }
}
