const createNavbar = () => {
  document.querySelector(
    "#navbar"
  ).innerHTML = ` <nav class="navbar navbar-expand-lg bg-dark navbar-dark py-3">
  <div class="container-fluid">
  <div class="col-4">
  <a class="navbar-brand fs-3 fw-bold w-100" href="./">
   <span class="w-100">
      <svg style="max-height: 60px" viewBox="0 0 45 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.6652 12.472C15.1452 12.472 14.6732 12.368 14.2492 12.16C13.8332 11.944 13.5052 11.612 13.2652 11.164C13.0252 10.708 12.9052 10.124 12.9052 9.412V5.788H15.6172V8.944C15.6172 9.408 15.6932 9.732 15.8452 9.916C15.9972 10.1 16.2052 10.192 16.4692 10.192C16.6292 10.192 16.7772 10.152 16.9132 10.072C17.0572 9.984 17.1732 9.844 17.2612 9.652C17.3492 9.452 17.3932 9.192 17.3932 8.872V5.788H20.1052V12.352H17.5252V10.456L18.0412 10.972C17.8092 11.484 17.4772 11.864 17.0452 12.112C16.6212 12.352 16.1612 12.472 15.6652 12.472Z" fill="#ECFFE3"/>
      <path d="M23.8761 12.472C23.3161 12.472 22.7641 12.412 22.2201 12.292C21.6761 12.172 21.2361 12.016 20.9001 11.824L21.6441 10.036C21.9561 10.22 22.3161 10.364 22.7241 10.468C23.1401 10.572 23.5441 10.624 23.9361 10.624C24.2641 10.624 24.4841 10.596 24.5961 10.54C24.7161 10.484 24.7761 10.408 24.7761 10.312C24.7761 10.216 24.7081 10.148 24.5721 10.108C24.4361 10.06 24.2561 10.024 24.0321 10C23.8081 9.976 23.5601 9.948 23.2881 9.916C23.0241 9.876 22.7561 9.82 22.4841 9.748C22.2121 9.676 21.9641 9.568 21.7401 9.424C21.5161 9.28 21.3361 9.088 21.2001 8.848C21.0641 8.6 20.9961 8.288 20.9961 7.912C20.9961 7.496 21.1201 7.12 21.3681 6.784C21.6241 6.448 22.0001 6.18 22.4961 5.98C23.0001 5.772 23.6201 5.668 24.3561 5.668C24.8361 5.668 25.3161 5.712 25.7961 5.8C26.2761 5.888 26.6881 6.024 27.0321 6.208L26.2881 7.996C25.9521 7.812 25.6201 7.688 25.2921 7.624C24.9721 7.552 24.6721 7.516 24.3921 7.516C24.0481 7.516 23.8121 7.548 23.6841 7.612C23.5641 7.676 23.5041 7.748 23.5041 7.828C23.5041 7.924 23.5721 7.996 23.7081 8.044C23.8441 8.092 24.0241 8.128 24.2481 8.152C24.4721 8.176 24.7161 8.208 24.9801 8.248C25.2521 8.28 25.5201 8.336 25.7841 8.416C26.0561 8.488 26.3041 8.596 26.5281 8.74C26.7521 8.884 26.9321 9.08 27.0681 9.328C27.2041 9.568 27.2721 9.876 27.2721 10.252C27.2721 10.644 27.1481 11.012 26.9001 11.356C26.6521 11.692 26.2761 11.964 25.7721 12.172C25.2681 12.372 24.6361 12.472 23.8761 12.472Z" fill="#ECFFE3"/>
      <path d="M28.0933 12.352V5.788H30.8053V12.352H28.0933ZM29.4493 5.26C28.9533 5.26 28.5573 5.128 28.2613 4.864C27.9653 4.6 27.8173 4.272 27.8173 3.88C27.8173 3.488 27.9653 3.16 28.2613 2.896C28.5573 2.632 28.9533 2.5 29.4493 2.5C29.9453 2.5 30.3413 2.624 30.6373 2.872C30.9333 3.12 31.0813 3.44 31.0813 3.832C31.0813 4.248 30.9333 4.592 30.6373 4.864C30.3413 5.128 29.9453 5.26 29.4493 5.26Z" fill="#ECFFE3"/>
      <path d="M32.3073 12.352V6.112C32.3073 5.264 32.5593 4.588 33.0633 4.084C33.5753 3.58 34.2993 3.328 35.2353 3.328C35.5233 3.328 35.8113 3.356 36.0993 3.412C36.3953 3.46 36.6433 3.54 36.8433 3.652L36.1953 5.536C36.1073 5.496 36.0113 5.46 35.9073 5.428C35.8033 5.396 35.6953 5.38 35.5833 5.38C35.3913 5.38 35.2353 5.44 35.1153 5.56C34.9953 5.68 34.9353 5.872 34.9353 6.136V6.448L35.0193 7.564V12.352H32.3073ZM31.4073 8.128V6.148H36.3633V8.128H31.4073Z" fill="#ECFFE3"/>
      <path d="M38.6739 14.8C38.3139 14.8 37.9459 14.744 37.5699 14.632C37.2019 14.528 36.9059 14.388 36.6819 14.212L37.5819 12.352C37.7179 12.456 37.8699 12.54 38.0379 12.604C38.2139 12.668 38.3819 12.7 38.5419 12.7C38.7819 12.7 38.9659 12.648 39.0939 12.544C39.2219 12.448 39.3259 12.3 39.4059 12.1L39.6819 11.404L39.8739 11.14L41.9739 5.788H44.5419L41.8419 12.484C41.6019 13.084 41.3219 13.552 41.0019 13.888C40.6899 14.224 40.3379 14.46 39.9459 14.596C39.5619 14.732 39.1379 14.8 38.6739 14.8ZM39.3099 12.652L36.4539 5.788H39.2379L41.2059 10.9L39.3099 12.652Z" fill="#ECFFE3"/>
      <path d="M12 2.97077C12 3.31653 12 6.08403 12 6.2841V13.1474C12 14.0229 10.1601 14.7321 9.12494 14.7321C8.08981 14.7321 7.24998 14.0229 7.24998 13.1474C7.24998 12.2719 8.08981 11.5627 9.12494 11.5627C9.34369 11.5627 9.55462 11.5944 9.74993 11.6539V4.71526L8.65897 6.5071L7.24998 9.11508L5.6587 7.01425L4.75002 5.70346V7.37884L4.75002 14.4151C4.75002 15.2906 2.9101 15.9998 1.87497 15.9998C0.839829 15.9998 0 15.2906 0 14.4151C0 13.5396 0.839829 12.8305 1.87497 12.8305C2.09371 12.8305 2.30465 12.8622 2.49996 12.9216L2.49996 5.48121C2.49996 5.34937 2.49996 4.74748 2.51663 4.16527C2.53863 3.39681 3.11384 2.85987 3.86078 2.67797L4.39622 2.54758C4.46512 2.5308 4.53646 2.52643 4.60689 2.53468V2.53468C4.85638 2.56391 5.08018 2.70195 5.21826 2.91178L5.30762 3.04756L7.00062 5.48121L8.19658 3.57962L8.75776 2.68403C9.23636 1.92023 9.66678 1.22528 10.5389 0.997594V0.997594C10.9501 0.890252 11.8142 0.600334 11.9017 1.01618C12.0004 1.48484 12 2.40508 12 2.97077Z" fill="url(#paint0_linear_270_18)"/>
      <defs>
      <linearGradient id="paint0_linear_270_18" x1="6" y1="0.736328" x2="6" y2="16.0003" gradientUnits="userSpaceOnUse">
      <stop stop-color="#00CF9D"/>
      <stop offset="1" stop-color="#00561D"/>
      </linearGradient>
      </defs>
      </svg>
   </span>
  </a>
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
            <p class="m-0 p-2 text-center bg-light border-top">Total result: <span id="serach-total-result">0</span> <i class="fa-solid fa-delete-left" onclick="onClearNavbarSearch()"></i></p>
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
            href="./profile.html"
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
  if (event.value.length >= 1) {
    setSuggestions(event.value);
    document.querySelector("#search-suggestion").classList.remove("d-none");
  } else {
    closeSuggestions();
  }
};

const onClearNavbarSearch = ()=> {
  $("#navbar input").val("")
  closeSuggestions()
}

const setSuggestions = (inputValue) => {
  const suggestions = ALL_SONGS.filter((song) =>
    song.title.toLowerCase().includes(inputValue.toLowerCase()) || song.artist.toLowerCase().includes(inputValue.toLowerCase())
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
  a.href = `./SongPage.html?songId=${id}`
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
  return;
});


document.querySelectorAll(".modal-input").forEach((element) => {
  element.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click
      console.log(element.parentElement.parentElement.querySelector("button").click());
    }
  });
});
