const addListItem = (imgUrl, title, price, itemID) => {
    const list = document.querySelector("#cart-list");
    price = parseFloat(price);
    price = price.toFixed(2)
    list.innerHTML += 
    `<div class="col-12 list-item rounded-2 overflow-hidden">
    <div class="row d-flex align-items-center">
        <div class="col-3 m-0 p-0">
            <img class="w-100" src=${imgUrl} alt="">
        </div>
        <div class="col-9 px-4 d-flex h-100 align-items-center justify-content-between">
            <span class="list-item-title fw-semibold text-light">${title}</span>
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
    document.querySelector("#shipping").innerHTML = shipping
    if(shipping !== "Free"){
        document.querySelector("#shipping").innerHTML += "$"
    }
    document.querySelector("#total").innerHTML = `${total}$`
}

const onDeleteFromCart = (event)=> {
    console.log("item id:",event.getAttribute("attr_id"));
    // todo: delete item from local storage and re-create the cartList
    createCartList()
}

const createCartList = ()=> {
    const list = document.querySelector("#cart-list");
    list.innerHTML = ""
    const numOfListItems = 0;

    if(numOfListItems === 0) { // cart is empty
        list.innerHTML = `<div class="alert alert-primary" role="alert">
        Your cart is empty. Please start shopping to add items.
    </div>`
    fillOrderSummary(0,0,"Free",0)
    }else {
        let subtotal = 0
        let discount = 0
        for (let index = 0; index < numOfListItems; index++) {
            addListItem("https://picsum.photos/200", "Song Title", 19.99, index)
            subtotal += 19.99
        }
        subtotal = subtotal.toFixed(2)
        fillOrderSummary(numOfListItems, subtotal, "Free", subtotal-discount);
    }
}

createCartList();