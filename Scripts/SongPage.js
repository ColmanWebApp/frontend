function createCard(song) {
  const songDurationInSeconds=song.duration/1000;//50000 -> 50sec -> 00:50 
  const minutes=(songDurationInSeconds/60).toFixed(0);
  const seconds=(songDurationInSeconds%60).toFixed(0);
  const songDuration=`${minutes>9?minutes:"0"+minutes}:${seconds>9?seconds:"0"+seconds}`;
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
        <button class="btn mx-0 px-0 link-light" onclick="previousPage()">
          <i class="fa-solid fa-arrow-left me-1"></i>
          Back
         </button>
      </div>
    </div>
    <div class="row song-items rounded-4 overflow-hidden w-75">
      <div class="col-md-4 m-0 p-0">
        <img src="${song.album_image}" class="img-fluid object-fit-cover h-100 w-100" alt=${song.title}" image">
      </div>
      <div class="col-md-8 d-flex align-items-center">
        <div class="card-body song-info d-flex flex-column justify-content-between">
            <div class="song-description col-6  ">
              <h1 class="card-title text-light fw-bold">${song.title}</h1>
              <p class="card-text m-0 p-0 fs-4">${song.album}</p>
              <p class="card-text m-0 p-0 fs-4">${song.artist}</p>
              <p class="card-text m-0 p-0 fs-4">${song.genre.join(", ")}</p>
              <p class="card-text m-0 p-0 fs-4">${song.year}</p>
              <p class="card-text m-0 p-0 fs-4">${songDuration}</p>
              <div id="preview">${preview}</div>
              
            </div>
            <div class="d-flex align-items-center justify-content-end add-to-cart mt-5 col-6 d-none" id="add-to-cart"></div>
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
    window.location.replace("../Pages/404.html");
    return;
  }
  const songsInCart = JSON.parse(localStorage.getItem("cart") || "[]");
  songsInCart.push(songId);
  localStorage.setItem("cart", JSON.stringify(songsInCart));
  updateNavbar();
  setAddToCart(songId);
  const toastLiveExample = document.getElementById('added-to-cart-pop-up')
      const toast = new bootstrap.Toast(toastLiveExample)
      toast.show()
}

async function setAddToCart(songId) {
  const addToCart = $("#add-to-cart");
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
        addToCart.removeClass("d-none");
        if (res.isExist) {
          $(".song-info").removeClass("flex-column");
          $(".song-description").addClass("pe-5");
          console.log(song.youtube_id)
          addToCart.html(`<iframe class="w-100 h-100" style="max-height:315px;" src="https://www.youtube.com/embed/${song.youtube_id}" referrerpolicy="no-referrer-when-downgrade"
          title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe>`);
          addToCart.addClass("ps-5");
          $("#preview").addClass("d-none");
          return;
        }
        addToCart.addClass("ms-auto");
        const songsInCart = JSON.parse(localStorage.getItem("cart") || "[]");
        if (songsInCart && songsInCart.includes(songId)) {
          addToCart.html(`<i class="fa-solid fa-check me-2" style="color: #5fcc24; "></i>Added to cart`);
          return;
        }
        addToCart.html(`<div class="price fs-5 me-3">${song.price.toFixed(2)}$</div>
  <div onclick="addToCart('${songId}')" class="px-5 add-to-cart-button btn btn-outline-light rounded-pill fs-5 ">Add to cart </div>`);
      })
      .fail(function (error) {
        alert("error:fail", error);
        return;
      });
  } else {
    addToCart.removeClass("d-none");
    addToCart.addClass("ms-auto");
    addToCart.html(`<div class="price fs-5 me-3">${song.price.toFixed(2)}$</div>
    <div onclick="addToCart('${songId}')" class="px-5 add-to-cart-button btn btn-outline-light rounded-pill fs-5" data-bs-toggle="modal" data-bs-target="#error-modal">Add to cart </div>`);
  }
}

$(document).ready(async function () {
  
  const urlParams = window.location.search;
  const searchParams = new URLSearchParams(urlParams);
  if (!searchParams.has("songId")) 
    window.location.replace("./404.html");
  else {
    const songId = searchParams.get("songId");
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
        window.location.replace("./404.html");
      });
  }
});
let song;
