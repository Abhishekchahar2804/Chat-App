const sign = document.getElementById("btn");

sign.addEventListener("click", AddUser);

async function AddUser(e) {
    e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phonenumber = document.getElementById("phonenumber").value;
  const password = document.getElementById("password").value;

  if (name == "" || email == "" || password == "") {
    window.alert("please enter all fields");
  }

  const obj = {
    name: name,
    email: email,
    phonenumber: phonenumber,
    password: password,
  };

  try {
    const response = await axios.post('http://localhost:4000/user/signup',obj);
    if(response.data.message==='success'){
      console.log(response.data.userInfo);
      alert('Successfuly Signed Up');
    }
    else{
      alert('User Alerady Exist Please Login')
    }
    
  } catch (err) {
    console.log(err);
  }
}
