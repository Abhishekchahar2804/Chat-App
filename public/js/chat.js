const chat = document.querySelector(".send");
const ul = document.getElementById('users');

let localChats=[];

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
    if(localChats.length==5){
      localChats.shift()
    }
    localChats.push(response.data.chat);
    localStorage.setItem("chats",JSON.stringify(localChats));
    let li = document.createElement('li');
    li.innerHTML = response.data.chat.username+" - "+response.data.chat.message;
    ul.appendChild(li);
    // allChats();
    chat.value="";
  } catch (err) {
    console.log(err);
  }
}

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

window.addEventListener('DOMContentLoaded',async()=>{
  try{
      const token =localStorage.getItem('token');
      const response =await axios.get('http://localhost:4000/chat/all-user',{ headers: { Authorization: token } });
      // console.log(response.data);
      showOnScreen(response.data.user);
      localChats =JSON.parse(localStorage.getItem('chats'))
      if(localChats){
        getChats(localChats)
      }
      
  }
  catch(err){
    console.log(err);
  }
})

const getChats = (chats) => {
  for(let chat of chats){
      let li = document.createElement('li');
      li.innerHTML = chat.username+" - "+chat.message;
      ul.appendChild(li);
  }
}
function showOnScreen(data){
  console.log(data);
    for(let d of data){
      // console.log(d.name);
      let li =document.createElement('li');
      li.innerText=d.name;
      ul.appendChild(li);
    }
}