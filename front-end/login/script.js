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
const password = document.getElementById("password");
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