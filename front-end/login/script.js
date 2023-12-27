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
    password_value.type="text";
    form.removeChild(first_eye);
    form.appendChild(second_eye);
})
second_eye.className ="fa-solid fa-eye-slash";
second_eye.addEventListener('click',()=>{
    password_value.type="password";
    form.removeChild(second_eye);
    form.appendChild(first_eye);
});
form.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const load_container = document.getElementById("load_container");
    const load = document.createElement("span");
    load.className = "loader";
    load_container.appendChild(load);
    load_container.style="display:flex; justify-content:center;align-items:center;";
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    try{
        const response = await fetch("http://localhost:3000/login",{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({username,password})
       
        });
        const responsedata = await response.json();
 
        if(response.ok){
            load_container.style="display:none;"
            Swal.fire({
                title:"تم تسجيل دخولك بنجاح",
                icon:"success",
                toast:true,
                position:'top-end',
            });
            localStorage.setItem("token",responsedata.token);
            window.location.href="../main-page/index.html";
        }
        else{
            load_container.style="display:none;"
            Swal.fire({
                title:responsedata.message,
                icon:"error",
                toast:true,
                position:'top-end',
            })
        }
    }catch(error){
        console.log(error);
    }
    
})