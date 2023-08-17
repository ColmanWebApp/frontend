const createNavbar = () => {
  document.querySelector(
    "#navbar"
  ).innerHTML = ` <nav class="navbar navbar-expand-lg bg-dark navbar-dark py-3">
  <div class="container-fluid">
    <div class="col-4">
      <a class="navbar-brand fs-3 fw-bold" href="/frontend/Pages/">MusicApp</a>
    </div>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarScroll"
      aria-controls="navbarScroll"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse col-8" id="navbarScroll">
      <form class="d-flex mt-3 mt-lg-0 col-12 col-lg-6 px-5" role="search">
        <div class="navbar-input-wrapper w-100 position-relative">
          <input class="form-control rounded-pill ps-5 search-input border-0"type="search"placeholder="Search . . ."aria-label="Search"
          oninput="onSearch(this)" onfocus="openSuggestions(this)"/>
          <div class="position-absolute w-100 mt-1 bg-light rounded-2 overflow-hidden d-none" id="search-suggestion">
            <div id="search-list" class="w-100 p-0">

            </div>
            <p class="m-0 p-2 text-center bg-light border-top">Total result: <span id="serach-total-result">0</span></p>
          </div>
        </div>
      </form>
      <ul class="navbar-nav ms-auto my-2 my-lg-0 col-12 col-lg-6 d-flex justify-content-end">
        <li class="not-connected-nav-item nav-item">
          <a
            class="nav-link active"
            aria-current="page"
            href="#"
            data-bs-toggle="modal"
            data-bs-target="#login-modal"
            onclick="resetModalsInputs()"
            >Login</a
          >
        </li>
        <li class="not-connected-nav-item nav-item">
          <button
            class="btn btn-outline-light rounded-pill px-4 ms-lg-2"
            data-bs-toggle="modal"
            data-bs-target="#signup-modal"
            onclick="resetModalsInputs()"
          >
            Signup
          </button>
        </li>
        <li class="connected-nav-item nav-item mt-4 mt-lg-0 me-lg-3">
          <a href="./orderPage.html" class="text-decoration-none">
            <div
              class="icon-wrapper position-relative d-flex align-items-center justify-content-center rounded-circle"
            >
              <i class="fa-solid fa-cart-shopping"></i>
              <span
                class="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-light text-dark"
                id="cart-badge"
              >
                0
              </span>
            </div>
          </a>
        </li>
        <div class="connected-nav-item nav-item mt-2 mt-lg-0 me-lg-3">
          <a
            href="/frontend/Pages/profile.html"
            class="text-decoration-none"
          >
            <div
              class="icon-wrapper d-flex align-items-center justify-content-center rounded-circle"
            >
              <i class="fa-solid fa-user"></i>
            </div>
          </a>
        </div>
        <li class="connected-nav-item nav-item mt-2 mt-lg-0">
          <a
            class="nav-link active"
            aria-current="page"
            href="#"
            onclick="onLogout()"
            >Logout</a
          >
        </li>
      </ul>
    </div>
  </div>
</nav>

<div
  class="modal fade"
  id="login-modal"
  tabindex="-1"
  aria-labelledby="exampleModalLabel"
  aria-hidden="true"
>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-4 fw-bold" id="exampleModalLabel">
          Login
        </h1>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">
        <div class="alert alert-danger px-4 py-2 d-none" role="alert">
          Authentication failed. Please try again.
        </div>
        <div class="email input-wrapper mb-3">
          <i class="fa-solid fa-envelope input-icon"></i>
          <input
            class="modal-input px-5 py-2 w-100 rounded-pill"
            type="email"
            name="login-email"
            id="login-email"
            placeholder="Email"
          />
        </div>
        <div class="password input-wrapper mb-3">
          <i class="fa-solid fa-lock input-icon"></i>
          <input
            class="modal-input px-5 py-2 w-100 rounded-pill"
            type="password"
            name="login-password"
            id="login-password"
            placeholder="Password"
          />
        </div>
        <div class="login-btn d-flex flex-column align-items-center">
          <button
            class="btn text-light w-100 modal-btn rounded-pill"
            onclick="onLogin()"
          >
            Login
          </button>
          <a
            href="#"
            class="text-decoration-none text-under-modal-btn mt-1"
            data-bs-toggle="modal"
            data-bs-target="#signup-modal"
            onclick="resetModalsInputs()"
            >Not a member? Sign up</a
          >
        </div>
      </div>
    </div>
  </div>
</div>

<div
  class="modal fade"
  id="signup-modal"
  tabindex="-1"
  aria-labelledby="exampleModalLabel2"
  aria-hidden="true"
>
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-4 fw-bold" id="exampleModalLabel2">
          Signup
        </h1>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">
        <div class="alert alert-danger px-4 py-2 d-none" role="alert">
          Oops! Something went wrong. Please try again.
        </div>
        <div class="email input-wrapper mb-3">
          <i class="fa-solid fa-user input-icon"></i>
          <input
            class="modal-input px-5 py-2 w-100 rounded-pill"
            type="text"
            name="signup-email"
            id="signup-fullname"
            placeholder="Full Name"
          />
        </div>
        <div class="email input-wrapper mb-3">
          <i class="fa-solid fa-envelope input-icon"></i>
          <input
            class="modal-input px-5 py-2 w-100 rounded-pill"
            type="email"
            name="signup-email"
            id="signup-email"
            placeholder="Email"
          />
        </div>
        <div class="password input-wrapper mb-3">
          <i class="fa-solid fa-lock input-icon"></i>
          <input
            class="modal-input px-5 py-2 w-100 rounded-pill"
            type="password"
            name="signup-password"
            id="signup-password"
            placeholder="Password - at least 8 characters"
          />
        </div>
        <div class="login-btn d-flex flex-column align-items-center">
          <button
            class="btn text-light w-100 modal-btn rounded-pill"
            onclick="onSignup()"
          >
            Signup
          </button>
          <a
            href="#"
            class="text-decoration-none text-under-modal-btn mt-1"
            data-bs-toggle="modal"
            data-bs-target="#login-modal"
            onclick="resetModalsInputs()"
            >Already a member? Sign in</a
          >
        </div>
      </div>
    </div>
  </div>
</div>`;

  updateNavbar();
};

const userBtnsCreator = () => {
  const connected = isMemberConnected();
  document.querySelectorAll(".not-connected-nav-item").forEach((element) => {
    if (connected) {
      element.classList.add("d-none");
    } else {
      element.classList.remove("d-none");
    }
  });

  document.querySelectorAll(".connected-nav-item").forEach((element) => {
    if (connected) {
      element.classList.remove("d-none");
    } else {
      element.classList.add("d-none");
    }
  });
};

const updateNavbar = () => {
  userBtnsCreator();
  if (isMemberConnected) {
    const cart = JSON.parse(localStorage.getItem("cart"));
    let cartLength;
    if (cart === null || cart.length === 0) {
      cartLength = 0;
    } else {
      cartLength = cart.length;
    }
    document.querySelector("#cart-badge").innerHTML = cartLength;
  }
};

const isMemberConnected = () => {
  const userToken = localStorage.getItem("user");
  return userToken !== null && userToken.length > 0;
};

const onLogout = () => {
  localStorage.clear();
  updateNavbar();
  window.location.reload();
};

const onLogin = () => {
  const emailInput = document.querySelector("#login-email");
  const passwordInput = document.querySelector("#login-password");
  // todo: login request to backend -> if true: redirect to home page, else: show an error to the user
  if (emailInput.value === "" || passwordInput.value === "") {
    showModalError();
    return;
  }
  // if (passwordInput.value.length < 8) {
  //   showModalError();
  //   return;
  // }

  loginRequest(emailInput.value, passwordInput.value);
};

const loginRequest = (email, password) => {
  $.ajax({
    url: "http://localhost:6969/auth/login",
    type: "POST",
    contentType: "application/json",
    secure: true,
    cors: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    data: JSON.stringify({
      email: email,
      password: password,
    }),
    success: function (res) {
      localStorage.setItem("user", res.token);
      $(".btn-close").click();
      updateNavbar();
      window.location.reload();
    },
  }).fail(function () {
    showModalError();
    return;
  });
};

const onSignup = () => {
  const fullnameInput = document.querySelector("#signup-fullname");
  const emailInput = document.querySelector("#signup-email");
  const passwordInput = document.querySelector("#signup-password");
  // todo: signup request to backend -> if true: redirect to home page and connect, else: show an error to the user
  $.ajax({
    url: "http://localhost:6969/auth/register",
    type: "POST",
    contentType: "application/json",
    secure: true,
    cors: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    data: JSON.stringify({
      name: fullnameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
    }),
    success: function (res) {
      loginRequest(emailInput.value, passwordInput.value);
      $(".btn-close").click();
      updateNavbar();
    },
  }).fail(function () {
    showModalError();
    return;
  });

  console.log("full name: " + fullnameInput.value);
  console.log("email: " + emailInput.value);
  console.log("password:" + passwordInput.value);
};

const onSearch = (event) => {
  if (event.value.length >= 2) {
    setSuggestions(event.value);
    document.querySelector("#search-suggestion").classList.remove("d-none");
  } else {
    closeSuggestions();
  }
};

const setSuggestions = (inputValue) => {
  const suggestions = ALL_SONGS.filter((song) =>
    song.title.toLowerCase().includes(inputValue.toLowerCase())
  );
  document.querySelector("#search-list").innerHTML = "";
  suggestions.forEach((suggestion) => {
    document
      .querySelector("#search-list")
      .appendChild(
        getSuggestion(
          suggestion.album_image,
          suggestion.title,
          suggestion.artist,
          suggestion._id
        )
      );
  });

  document.querySelector("#serach-total-result").innerHTML = suggestions.length
  // console.log("suggestions:",suggestions);
};

const getSuggestion = (imgUrl, title, artist, id) => {
  const a = document.createElement("a");
  a.classList += "serach-list-item d-flex align-items-center text-decoration-none";
  a.href = `./frontend/Pages/SongPage/${id}`
  a.innerHTML = `
  <div class="col-3 d-flex align-items-center justify-content-center p-3">
    <img src="${imgUrl}" alt="${title} image" class="w-100 rounded-1">
  </div>
  <div class="result-content col-9 d-flex justify-content-between align-items-center p-3">
    <span class="fw-medium text-dark col-6">${title}</span>
    <span class="text-99 col-6 text-end">${artist}</span>
  </div>`;

  return a
};

const openSuggestions = (event) => {
  if (event.value.length >= 2) {
    document.querySelector("#search-suggestion").classList.remove("d-none");
  }
};

const closeSuggestions = () => {
  document.querySelector("#search-suggestion").classList.add("d-none");
};

const resetModalsInputs = () => {
  document.querySelectorAll(".modal-input").forEach((element) => {
    element.value = "";
  });
  unshowModalError();
};

const showModalError = () => {
  document.querySelectorAll(".modal-body .alert").forEach((element) => {
    element.classList.remove("d-none");
  });
};

const unshowModalError = () => {
  document.querySelectorAll(".modal-body .alert").forEach((element) => {
    element.classList.add("d-none");
  });
};

createNavbar();
let ALL_SONGS = [];
$.ajax({
  url: "http://localhost:6969/songs",
  type: "GET",
  contentType: "application/json",
  secure: true,
  cors: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
  success: function (res) {
    ALL_SONGS = res
  },
}).fail(function () {
  alert("error")
  return;
});