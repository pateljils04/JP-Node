// post data update
let updateTitle = document.getElementById("post-title");
let updateId = document.getElementById("post-id");
let updateImage = document.getElementById("post-image");
let updateCategory = document.getElementById("post-category");
let updatePrice = document.getElementById("post-price");
let updatePostBtn = document.getElementById("add-post");


// put data update
let updatePutId = document.getElementById("update-put-id");
let updatePutTitle = document.getElementById("update-put-title");
let updatePutImage = document.getElementById("update-put-image");
let updatePutCategory = document.getElementById("update-put-category");
let updatePutPrice = document.getElementById("update-put-price");
let updatePutBtn = document.getElementById("update-put");


// Patch update
let PatchId = document.getElementById("update-id-patch");
let PatchPrice = document.getElementById("update-price-patch");
let PatchBtn = document.getElementById("update-patch");




let productdata = []

function Fetchdata() {
    fetch("http://localhost:8090/getdata")
        .then((res) => res.json())
        .then((data) => {
            CardList(data)
            productdata = data
        })
        .catch((err) => console.log(err))
}
Fetchdata()

function CardList(data) {

    const store = data.map((el) => Singlecard(el.id,el.title, el.image, el.category, el.price))
    // console.log(store)
    document.getElementById("Maindata").innerHTML = store.join("")
}




function Singlecard(id,title, image, category, price) {
    // console.log(image,title)
    return card = `
        <div class="text-center" style="border:2px solid black; padding:6px;" data-id=${id}>
            <img src="${image}" alt="
            ${title}" height="300px" width="300px">
            <h5>${title}</h5>
            <h5>Price-${price}</h5>
            <h6>${category}</h6>
             <button class="Edit-Btn px-4 py-1 bg-dark text-light" data-id=${id} style="border:2px solid rgb(140, 149, 244);">Edit</button>
            <button class="card-Btn px-4 py-1 bg-dark text-light" data-id=${id} style="border:2px solid rgb(140, 149, 244);">Delete</button>
            
        </div>
    `
}



// ###### POST PART

updatePostBtn.addEventListener("click", (e) => {
    e.preventDefault()

    let product = {
        id:updateId.value,
        title: updateTitle.value,
        image: updateImage.value,
        category: updateCategory.value,
        price: updatePrice.value
    }

    fetch("http://localhost:8090/addproducts", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(product)
    })
        .then((data) => alert("data add through post method..."))
        .catch((err) => console.log(err))
})



// ########   Put part


document.addEventListener(("click"),(e)=>{
    if(e.target.classList.contains("Edit-Btn")){
        updateproduct(e.target.dataset.id)
    }
})

function updateproduct(id){
    const filterdata = productdata.filter((el)=>el.id==id)

    const title = filterdata[0].title;
    const image = filterdata[0].image;
    const category = filterdata[0].category;
    const price = filterdata[0].price;


    updatePutId.value=id;
    updatePutTitle.value=title;
    updatePutImage.value=image;
    updatePutCategory.value=category;
    updatePutPrice.value=price;
}

updatePutBtn.addEventListener(("click"),(e)=>{
    let obj={
        id:updatePutId.value,
        title:updatePutTitle.value,
        image:updatePutImage.value,
        category:updatePutCategory.value,
        price:updatePutPrice.value
    }

    fetch(`http://localhost:8090/editdb/${obj.id}`,{
        method:"PUT",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
    })
    .then((data)=>alert("Put Data are Updated"))
    .catch((err)=>console.log(err))
})


//###### Delete part


document.addEventListener(("click"),(e)=>{
    if(e.target.classList.contains("card-Btn")){
        DeleteProduct(e.target.dataset.id)
    }
})


function DeleteProduct(id){
    fetch(`http://localhost:8090/deletedata/${id}`,{
        method:"DELETE"
    })
    .then((data)=>{
        alert("deleted...")
        console.log(data)
    })
    .catch((err)=>console.log(err))
}



// ###### Patch part

PatchBtn.addEventListener(("click"),()=>{
    let obj={
        id:PatchId.value,
        price:PatchPrice.value
    }

    fetch(`http://localhost:8090/editdata/${obj.id}`,{
        method:"PATCH",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj)
    })
    .then((data)=>alert("data price update"))
    .catch((err)=>console.log(err))
})






