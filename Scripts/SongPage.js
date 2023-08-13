function createCard(song) {
  let preview = "";
  if (song.preview_url)
    preview = `<div id="preview-bar" class="d-flex align-items-center mt-3">
    <video id="preview-sound-bar"controls name="media"><source src=${song.preview_url} type="audio/mpeg"></video>
    <p id="preview-text" class="p-0 m-0 ms-3">Preview</p>
    </div>`;
  const card = `
  <div class="card song-card d-flex justify-content-center align-items-center mb-3 border-0">
    <div class="row p-0 m-0 w-75">
      <div class="col-12 p-0 m-0">
        <div onclick="previousPage()" class="back btn text-light text-start p-0 m-0">Back</div>
      </div>
    </div>
    <div class="row song-items rounded-4 overflow-hidden w-75">
      <div class="col-md-4 m-0 p-0">
        <img src="${song.album_image}" class="img-fluid object-fit-cover h-100 w-100" alt=${song.title}" image">
      </div>
      <div class="col-md-8">
        <div class="card-body song-info p-5">
            <div class="song-description ">
              <h1 class="card-title text-light fw-bold">${song.title}</h1>
              <p class="card-text m-0 p-0 fs-4">${song.album}</p>
              <p class="card-text m-0 p-0 fs-4">${song.artist}</p>
              <p class="card-text m-0 p-0 fs-4">${song.genre}</p>
              <p class="card-text m-0 p-0 fs-4">${song.year}</p>
              <p class="card-text m-0 p-0 fs-4">${song.duration}</p>
              ${preview}
            </div>
            <div class="d-flex align-items-center justify-content-end add-to-cart mt-5" id="add-to-cart">
            <div class="price fs-5 me-3">${song.price}$</div>
              <div onclick="addToCart('${song._id}')" class="px-5 add-to-cart-button btn btn-outline-light rounded-pill fs-5 ">Add to cart </div>
            </div>
        </div>
      </div>
    </div>
  </div>`;
  $(".song-container").append(card);
}

function previousPage() {
  window.history.back();
}

function addToCart(songId) {
  if (!localStorage.getItem("user")) {
    return;
  }
  if (!songId) {
    window.location.replace("../Pages/404.html")
    return;
  }
  const songsInCart = JSON.parse(localStorage.getItem("cart") || "[]");
  songsInCart.push(songId);
  localStorage.setItem("cart", JSON.stringify(songsInCart));
  updateNavbar();
  setAddToCart(songId);
}

async function setAddToCart(songId) {
  const addToCart = $("#add-to-cart");
  console.log("song id:", songId);
  if (localStorage.getItem("user")) {
    await $.ajax({
      url: `http://localhost:6969/users/check-song/${songId}/`,
      type: "POST",
      secure: true,
      cors: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      data: {
        token: localStorage.getItem("user"),
      },
    })
      .done(function (res) {
        if (res.isExist) {
          addToCart.html("Song already in library");
          return;
        }
        const songsInCart = JSON.parse(localStorage.getItem("cart") || "[]");
        if (songsInCart && songsInCart.includes(songId)) {
          addToCart.html("Song already in cart");
          return;
        }
        addToCart.html(`<div class="price fs-5 me-3">${song.price}$</div>
  <div onclick="addToCart('${songId}')" class="px-5 add-to-cart-button btn btn-outline-light rounded-pill fs-5 ">Add to cart </div>`);
      })
      .fail(function (error) {
        alert("error:", error);
        return;
      });
  }
  else{
    addToCart.html(`<div class="price fs-5 me-3">${song.price}$</div>
    <div onclick="addToCart('${songId}')" class="px-5 add-to-cart-button btn btn-outline-light rounded-pill fs-5" data-bs-toggle="modal" data-bs-target="#error-modal">Add to cart </div>`);
  }
}

$(document).ready(async function () {
  const urlParams = window.location.search;
  const searchParams = new URLSearchParams(urlParams);
  if (searchParams.has("songId"))
    // add !
    //window.location.replace("/"); // remove from //
    console.log("no Id found");
  else {
    const songId = "64d7d41f3a0cb8522dbf45e5"; // add later searchParams.get("songId")
    const myJson = {
      url: `http://localhost:6969/songs/${songId}/`,
      type: "GET",
      contentType: "application/json",
      secure: true,
      cors: true,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
    };
    await $.ajax(myJson)
      .done(function (res) {
        song = res;
        createCard(song);
        setAddToCart(song._id);
      })
      .fail(function (error) {
        console.log("failed", error);
      });
  }
});
let song;
