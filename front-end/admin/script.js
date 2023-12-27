const form = document.getElementById("form");
form.addEventListener("submit", async (e) => {
    e.preventDefault(); 

    const product_name = document.getElementById("product_name").value;
    const product_image = document.getElementById("product_img").value;
    const product_price = document.getElementById("product_price").value;
    const load_container = document.getElementById("load_container");
    load_container.innerHTML = ''; 
    const load = document.createElement("span");
    load.className = "loader"; 
    load_container.appendChild(load);
    load_container.style = "display:flex; justify-content:center; align-items:center;";
    Number(product_price);
    try {
        const response = await fetch("http://localhost:3000/addproduct", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                'Authorization': 'Bearer ' + localStorage.getItem("token") 
            },
            body: JSON.stringify({ product_name, product_image,product_price })
        });

        
        const responseData = await response.json(); 
        if (response.ok) {
            load_container.style = "display:none;"; 
            Swal.fire({
                title:responseData.message,
                icon:"success",
                toast:true,
                position:'top-end',
                timer:1000,
            })
            // throw new Error(`Error: ${response.status}`); 
        }
        else{
            Swal.fire({
                title:"Something went wrong please try again later",
                icon:"error",
                toast:true,
                position:'top-end',
                timer:1000,
            })
        }
        console.log(responseData);
    } catch (error) {
        console.error("Error during form submission:", error);
        alert("Failed to add product. Error: " + error.message);
        load_container.style = "display:none;"; 
    }
});