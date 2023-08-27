const addListItem = (imgUrl, title, price, itemID) => {
  const list = document.querySelector("#cart-list");
  price = price.toFixed(2);
  list.innerHTML += `<div class="col-12 list-item rounded-2 overflow-hidden position-relative mb-3">
        <div class="row d-flex align-items-center">
            <div class="col-3 m-0 p-0">
                <img class="w-100" src=${imgUrl} alt="">
            </div>
            <div class="col-9 px-4 d-flex h-100 align-items-center justify-content-between">
                <span class="list-item-title fw-semibold text-light col-6 col-md-7 col-lg-9">${title}</span>
                <span>
                    <span class="price me-3">$${price}</span>
                    <i class="fa-solid fa-trash" attr_id=${itemID} onclick="onDeleteFromCart(this)"></i>
                </span>
            </div>
        </div>
    </div>`;
};

const fillOrderSummary = (totalItems, subtotal, shipping, total) => {
  document.querySelector("#num-of-items").innerHTML = `${totalItems}`;
  document.querySelector("#subtotal").innerHTML = `${subtotal}`;
  document.querySelector("#shipping").innerHTML = `${shipping}${
    shipping !== "Free" ? "$" : ""
  }`;
  document.querySelector("#total").innerHTML = `${total.toFixed(2)}`;
};

const onDeleteFromCart = (event) => {
  // console.log("item id:", event.getAttribute("attr_id"));
  removeItemFromCart(event.getAttribute("attr_id"));
  handleCheckoutBtnStyle();
  setIls();
};

const onCheckout = () => {
  const cartOnStorage = JSON.parse(localStorage.getItem("cart"));
  const userToken = localStorage.getItem("user");
  if (
    cartOnStorage === null ||
    cartOnStorage.length === 0 ||
    userToken === null ||
    userToken.length === 0
  ) {
    return;
  }

  // todo: Ajax -> create order
  $.ajax({
    url: "http://localhost:6969/orders",
    type: "POST",
    // contentType: "application/json",
    secure: true,
    cors: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    data: {
      token: String(localStorage.getItem("user")),
      order: { songs: cartOnStorage },
    },
  })
    .fail(function () {
      const checkoutModalContent = document.querySelector(
        "#checkout-modal .modal-body"
      );
      checkoutModalContent.innerHTML = `Something went wrong!<br>Try again later...`;
      $("#checkout-modal").modal("show");
      console.log("something when wront");
      return;
    })
    .done(function () {
      localStorage.removeItem("cart");
      updateNavbar();
      const checkoutModalSongsListElement = document.querySelector("#songs-list-modal");
      checkoutModalSongsListElement.innerHTML = "";
      songsFromDB.forEach((element) => {
        checkoutModalSongsListElement.innerHTML += `<li>${element.title}</li>`;
      });
      $("#checkout-modal").modal("show");
    });

  //   removeItemFromCart(null, true);
  // todo: redirect to home page
};

const createCartList = async () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  // console.log(cart);
  const list = document.querySelector("#cart-list");
  list.innerHTML = "";
  if (cart === null || cart.length === 0) {
    // cart is empty
    list.innerHTML = `<div class="alert alert-primary" role="alert">
            Your cart is empty. Please start shopping to add items.
        </div>`;
    fillOrderSummary(0, 0, "Free", 0);
  } else {
    // const cartList = cart.split(",");
    var subtotal = 0.0;
    let discount = 0.0;
    let shipping = 0.0;
    await $.ajax({
      url: `http://localhost:6969/songs/get-songs`,
      type: "POST",
      secure: true,
      cors: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        ids: cart,
      },
    })
      .fail(function (err) {
        console.log(`failed: ${err}`);
        window.location.replace("./404.html");
        return;
      })
      .done(function (res) {
        songsFromDB = res;
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
            cart.length,
            subtotal,
            shipping === 0 ? "Free" : shipping.toFixed(2),
            subtotal - discount + shipping
          );
        }
      });
  }
};

const publishToFacebook = async () => {
  let user;
  await $.ajax({
    url: `http://localhost:6969/users/user-details`,
    type: "POST",
    secure: true,
    cors: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    data: {
      token: localStorage.getItem("user"),
    },
  }).done((res) => (user = res));
  //count how many li items there are in #songs-list-modal
  const numOfSongs = document.querySelectorAll("#songs-list-modal li").length;
  const message = `${user.name} has just bought ${numOfSongs} new songs from Moozika! 🎵🎶 \nTry it yourself! \nhttp://www.localhost:5500/Pages/`;
  postToFacebook(message);
};

const removeItemFromCart = async (itemID, removeAll = false) => {
  if (!removeAll) {
    cart = JSON.parse(localStorage.getItem("cart"));
    cart = cart.filter((id) => id != itemID);
    localStorage.setItem("cart", JSON.stringify(cart));
    if (cart.length === 0) {
      localStorage.removeItem("cart");
    }
  } else {
    localStorage.removeItem("cart");
  }
  await createCartList();
  updateNavbar();
  setIls();
};

const addToLocalStorage = () => {
  const cart = [
    "64d2a2af3a54f70b2c2883f3",
    "64ccda0c5fad016c15f71c3d",
    "64ccd9dd5fad016c15f71c39",
  ];
  localStorage.setItem("cart", JSON.stringify(cart));
  updateNavbar();
};

const handlePermissions = () => {
  if (!localStorage.getItem("user")) window.location.replace("./index.html");
};

const getUsdToIls = async () => {
  await $.ajax({
    url: `https://v6.exchangerate-api.com/v6/d49e704b01ca5fa2a23ed2cc/latest/USD`,
    type: "GET",
    secure: true,
    cors: true,
  })
    .done((res) => {
      ilsBool = true;
      usdInIls = res.conversion_rates.ILS;
    })
    .fail((error) => console.log(error));
};

const handleCheckoutBtnStyle = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (!cart || cart.length == 0) {
    document.querySelector("#checkout-btn").setAttribute("disabled", "");
  }
};

const setIls = () => {
  if (ilsBool) {
    const totalPrice = $("#total").text();
    $("#ils").text(`~ ${(usdInIls * totalPrice).toFixed(2)}₪`);
    const subtotalPrice = $("#subtotal").text();
    $("#subtotal-ils").text(`~ ${(usdInIls * subtotalPrice).toFixed(2)}₪`);
  }
};

const handleBack = () => {
  window.history.back();
};
$(document).ready(async () => {
  handlePermissions();
  handleCheckoutBtnStyle();
  await createCartList();
  console.log("before getUsdToIls");
  await getUsdToIls();
  console.log("after getUsdToIls", ilsBool, usdInIls);
  setIls();
  console.log("after setILS");

  $("#navbar").removeClass("d-none");
  $("#content").removeClass("d-none");
  $("#footer").removeClass("d-none");
  $("#loader").addClass("d-none");
});

// --- GLOBAL VARS ---
let songsFromDB;
let ilsBool = false;
let usdInIls = 1;
