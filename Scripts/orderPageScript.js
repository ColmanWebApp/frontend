const addListItem = (imgUrl, title, price, itemID) => {
  const list = document.querySelector("#cart-list");
  price = parseFloat(price);
  price = price.toFixed(2);
  list.innerHTML += `<div class="col-12 list-item rounded-2 overflow-hidden position-relative mb-3">
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
    </div>`;
};

const fillOrderSummary = (totalItems, subtotal, shipping, total) => {
  document.querySelector("#num-of-items").innerHTML = `${totalItems}`;
  document.querySelector("#subtotal").innerHTML = `${subtotal}$`;
  document.querySelector("#shipping").innerHTML = `${shipping}${
    shipping !== "Free" ? "$" : ""
  }`;
  document.querySelector("#total").innerHTML = `${total.toFixed(2)}$`;
};

const onDeleteFromCart = (event) => {
  console.log("item id:", event.getAttribute("attr_id"));
  removeItemFromCart(event.getAttribute("attr_id"));
};

const onCheckout = () => {
  const cartOnStorage = localStorage.getItem("cart");
  const userToken = localStorage.getItem("user");
  if (
    cartOnStorage === null ||
    cartOnStorage.length === 0 ||
    userToken === null ||
    userToken.length === 0
  ) {
    return;
  }
  const splitedCart = cartOnStorage.split(",");
  const songsIdsArr = [];
  for (let i = 0; i < splitedCart.length; i++) {
    songsIdsArr.push(String(splitedCart[i]));
  }
  console.log(`checkout clicked - after validate localstorage`);
  // todo: Ajax -> create order
  $.ajax({
    url: "http://localhost:6969/orders",
    type: "POST",
    contentType: "application/json",
    secure: true,
    cors: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    data: JSON.stringify({
      token: String(localStorage.getItem("user")),
      songs: songsIdsArr,
    }),
  })
    .fail(function () {
      console.log("something when wront");
      return;
    })
    .done(function () {
      localStorage.removeItem("cart");
      updateNavbar();
      window.location.replace("/");
      console.log("finish success");
    });

  //   removeItemFromCart(null, true);
  // todo: redirect to home page
};

const createCartList = () => {
  const cart = localStorage.getItem("cart");
  const list = document.querySelector("#cart-list");
  list.innerHTML = "";
  if (cart === null || cart.length === 0) {
    // cart is empty
    list.innerHTML = `<div class="alert alert-primary" role="alert">
            Your cart is empty. Please start shopping to add items.
        </div>`;
    fillOrderSummary(0, 0, "Free", 0);
  } else {
    const cartList = cart.split(",");
    var subtotal = 0.0;
    let discount = 0.0;
    let shipping = 0.0;
    $.ajax({
      // url: `http://localhost:6969/songs/get-songs`,
      url: `http://localhost:6969/songs/`,
      type: "GET",
      secure: true,
      cors: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      // data: {
      //   ids: cartList
      // },
    })
      .fail(function (err) {
        console.log(`failed: ${err}`);
        window.location.replace("./404.html");
        return;
      })
      .done(function (res) {
        for (let index = 0; index < res.length; index++) {
          const element = res[index];
          addListItem(
            element.album_image,
            element.title,
            element.price,
            element._id
          );
          subtotal = subtotal - 0 + parseFloat(element.price);
          subtotal = subtotal.toFixed(2);
          fillOrderSummary(
            cartList.length,
            subtotal,
            shipping === 0 ? "Free" : shipping.toFixed(2),
            subtotal - discount + shipping
          );
        }
      });
  }
};

const removeItemFromCart = (itemID, removeAll = false) => {
  if (!removeAll) {
    cart = localStorage.getItem("cart").split(",");
    const newCart = cart.filter((id) => id != itemID);
    localStorage.setItem("cart", newCart);
    if (localStorage.getItem("cart").length === 0) {
      localStorage.removeItem("cart");
    }
  } else {
    localStorage.removeItem("cart");
  }
  createCartList();
  updateNavbar();
};

const addToLocalStorage = () => {
  const cart = ["64d2a2af3a54f70b2c2883f3", "64ccda0c5fad016c15f71c3d"];
  localStorage.setItem("cart", cart);
  updateNavbar();
};

// addToLocalStorage();
// localStorage.clear()
createCartList();
