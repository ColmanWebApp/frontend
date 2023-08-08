const addListItem = (imgUrl, title, price, itemID) => {
    const list = document.querySelector("#cart-list");
    price = parseFloat(price);
    price = price.toFixed(2)
    list.innerHTML += 
    `<div class="col-12 list-item rounded-2 overflow-hidden position-relative mb-3">
    <div class="row d-flex align-items-center">
        <div class="col-3 m-0 p-0">
            <img class="w-100" src=${imgUrl} alt="">
        </div>
        <div class="col-9 px-4 d-flex h-100 align-items-center justify-content-between">
            <span class="list-item-title fw-semibold text-light col-6 col-md-7 col-lg-9">${title}</span>
            <span>
                <span class="price me-3">${price}$</span>
                <i class="fa-solid fa-trash" attr_id=${itemID} onclick="onDeleteFromCart(this)"></i>
            </span>
        </div>
    </div>
</div>`
}

const fillOrderSummary = (totalItems, subtotal, shipping, total)=> {
    document.querySelector("#num-of-items").innerHTML = `${totalItems}`
    document.querySelector("#subtotal").innerHTML = `${subtotal}$`
    document.querySelector("#shipping").innerHTML = `${shipping}${shipping!== "Free" ? "$" : ""}`
    document.querySelector("#total").innerHTML = `${total.toFixed(2)}$`
}

const onDeleteFromCart = (event)=> {
    console.log("item id:",event.getAttribute("attr_id"));
    // todo: delete item from local storage and re-create the cartList
    createCartList()
}

const createCartList = ()=> {
    const list = document.querySelector("#cart-list");
    list.innerHTML = ""
    const numOfListItems = 5; // todo: get the value from local-storage

    if(numOfListItems === 0) { // cart is empty
        list.innerHTML = 
        `<div class="alert alert-primary" role="alert">
            Your cart is empty. Please start shopping to add items.
        </div>`
        fillOrderSummary(0,0,"Free",0)
    }else {
        let subtotal = 0
        let discount = 0
        let shipping = 0
        for (let index = 0; index < numOfListItems; index++) {
            let itemPrice = 19.99 + index
            addListItem("https://picsum.photos/200", "Song Title", itemPrice, index)
            subtotal += itemPrice
        }
        subtotal = subtotal.toFixed(2)
        fillOrderSummary(numOfListItems, subtotal, shipping === 0 ? "Free" : shipping.toFixed(2), subtotal - discount + shipping);
    }
}

createCartList();