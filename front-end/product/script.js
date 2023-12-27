const container = document.getElementById("p_container");
container.style="display:flex;justify-content:center;align-items:center;w"
const show_products = async()=>{
    try{
        const response = await fetch('http://localhost:3000/getproducts',{
            headers:{
                'Authorization':'Bearer'+localStorage.getItem('token'),
            },
        })
        console.log("res",response);
        const products = await response.json();
        for(let i = 0; i < products.length;i++){
            const card = document.createElement('div');
            card.className = "card";
            card.innerHTML = `<img class='p_img' src='${products[i].product_image}}'>
            <p class='p_name'>${products[i].product_name}</p> <p class='p_price'>${products[i].product_price}</p> <button>شراء</button>`;
            container.appendChild(card);
        }
    }
    catch(error){
        console.log(error);
    }
}
show_products()