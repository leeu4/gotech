const cards_container = document.getElementById("container");
const cards_content = [
    {class:'fa-brands fa-google'},
    {class:'fa-brands fa-facebook'},
    {class:'fa-brands fa-microsoft'}
]
for(let i = 0; i<cards_content.length;i++){
    const cards = document.createElement("button");
    cards.className = cards_content[i].class;
    cards_container.appendChild(cards);
    
}
const password_value = document.getElementById("password");
const first_eye = document.getElementById("first_eye");
const form = document.querySelector("form")
const second_eye = document.createElement("i");
first_eye.addEventListener('click',()=>{
    password.type="text";
    form.removeChild(first_eye);
    form.appendChild(second_eye);
})
second_eye.className ="fa-solid fa-eye-slash";
second_eye.addEventListener('click',()=>{
    password.type="password";
    form.removeChild(second_eye);
    form.appendChild(first_eye);
})
form.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const load_container = document.getElementById("load_container");
    const load = document.createElement("span");
    load.className = "loader";
    load_container.appendChild(load);
    load_container.style="display:flex; justify-content:center;align-items:center;";

    const password = document.getElementById("password").value;
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const response = await fetch('http://localhost:3000/register',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({username,password,email})
    });
    const data=response.json();
    if(response.ok){
        load_container.style="display:none;"
        load_container.removeChild(load);
        Swal.fire({
            title:"تم تسجيل حسابك بنجاح",
            icon:"success",
            toast:true,
            position:'top-end',
        });
        window.location.href="../login/index.html";
    }
    else{
        load_container.removeChild(load)
        load_container.style="display:none;"
        Swal.fire({
            title:data.message,
            icon:"error",
            toast:true,
            position:'top-end',
        })
    }
})
