const form = document.getElementById("form");
const product_name = document.getElementById("p_name").value;
const product_img = document.getElementById("p_img").value;
const product_price = document.getElementById("p_price").value;


form.addEventListener("submit",async(e)=>{
    e.preventDefault();
    const load_container = document.getElementById("load_container");
    const load = document.createElement("span");
    load.className = "loader";
    load_container.appendChild(load);
    load_container.style="display:flex; justify-content:center;align-items:center;";
    try{
        const response = await fetch("http://localhost:3000/addproduct",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                'Authorization':'Bearer'+ localStorage.getItem("token")
            },
            body:JSON.stringify({product_name,product_price,product_img,})
        });
        console.log(response,"res");
        await response.json();
    load_container.style="display:none;"
    }catch(error){
        console.log("front-end",error);
        alert("sssss",error)
    }
})