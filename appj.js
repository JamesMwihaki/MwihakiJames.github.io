const productsEl = document.querySelector(".products");
const productsEl1 = document.querySelector(".productsl");
const  subtotalEl= document.querySelector(".subtotal");
const  totalItemsInCartEl= document.querySelector(".total-items-in-cart");


function renderProducts(){
    products.forEach( (product) => {
        productsEl.innerHTML += `
        <div class="col4">
                <img src="${product.imgSrc}" >
                <h4>${product.name}</h4>
                <span class="price"> ${product.price} </span>
                <div class="fa fa-shopping-cart" class="add-to-cart" onclick="addToCart(${product.id})">
                </div>
        </div>
        `;
    })
} 

renderProducts();


// cart array
let cart = JSON.parse(localStorage.getItem("CART")) || [];
updateCart();

function addToCart(id){
    //check if the product exists

    if(cart.some((item) => item.id === id))
    {
        changeNumberOfUnits("plus", id);
    }
    else
    {
        const item = products.find((product) => product.id === id)

        cart.push({
            ...item,
            numberOfUnits: 1
        })
    
    }
   updateCart();
}
//// update cart
function updateCart(){
    renderCartItems();
    renderSubtotal();

    //save cart to local storage
    localStorage.setItem("CART", JSON.stringify(cart));
}

//calculate the subtotal
function renderSubtotal(){
    let totalPrice = 0, totalItems = 0;

    cart.forEach((item) => {
        totalPrice += item.price * item.numberOfUnits;
        totalItems += item.numberOfUnits; 

        subtotalEl.innerHTML = `Subtotal (${totalItems} item): $${totalPrice.toFixed(2)}`;
        totalItemsInCartEl.innerHTML = totalItems;


    })
}




function renderCartItems(){
    productsEl1.innerHTML = "";
    cart.forEach((item) => {
        productsEl1.innerHTML +=`
        <div class="full__cart">
            <div class="cart-item">
                <img src="${item.imgSrc}" alt="${item.name}">
                <h4>${item.name}</h4>
            </div>
            <div class="price">
                <small>$</small>${item.price}
                <button onclick="removeItemFromCart(${item.id})">Remove</button> 
            </div>
            <div class="units">
            <div class="btn minus" onclick="changeNumberOfUnits('minus', ${item.id})"> - </div>
            <div class="number">${item.numberOfUnits}</div>
            <div class="btn plus" onclick="changeNumberOfUnits('plus', ${item.id})"> + </div>  
            </div>
        </div>
        `;

    });
}


//remove items from cart 
function removeItemFromCart(id){
    cart = cart.filter((item) => item.id != id);
    updateCart();
}


 // change number of units
 function changeNumberOfUnits(action, id){
     cart = cart.map((item) => {

        let numberOfUnits = item.numberOfUnits;

        if(item.id === id)
        {
            if(action === "minus" && numberOfUnits > 1)
            {
                numberOfUnits--;
            }
            else if(action === "plus" && numberOfUnits <item.instock)
            {
                numberOfUnits++;
            }
        }
        
     return {...item, 
        numberOfUnits,
        };

        

     });
    updateCart();

     
 }

app.get('/product:id', (req, res) => {
    res.sendFile(path.join(staticPath, "cart.html"))

})


