const createNavbar = () => {
  document.querySelector(
    "#navbar"
  ).innerHTML = ` <nav class="navbar navbar-expand-lg bg-dark navbar-dark py-3">
  <div class="container-fluid">
  <div class="col-4">
  <a class="navbar-brand fs-3 fw-bold w-100" href="./">
    <svg width="218" height="62" viewBox="0 0 218 62" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M46.5006 11.5122C46.5006 12.8521 46.5006 23.5763 46.5006 24.3515V50.9472C46.5006 54.3399 39.3709 57.0878 35.3596 57.0878C31.3484 57.0878 28.094 54.3399 28.094 50.9472C28.094 47.5545 31.3484 44.8065 35.3596 44.8065C36.2073 44.8065 37.0247 44.9294 37.7815 45.1596V18.2722L33.554 25.2157L28.094 35.3218L21.9278 27.1809L18.4066 22.1015V28.5937L18.4066 55.8597C18.4066 59.2524 11.2768 62.0003 7.2656 62.0003C3.25438 62.0003 0 59.2524 0 55.8597C0 52.467 3.25438 49.7191 7.2656 49.7191C8.11325 49.7191 8.93063 49.8419 9.68746 50.0721L9.68746 21.2403C9.68746 20.7294 9.68746 18.3971 9.75206 16.141C9.83733 13.1631 12.0663 11.0825 14.9607 10.3776L17.0356 9.87232C17.3026 9.8073 17.579 9.79038 17.8519 9.82235V9.82235C18.8187 9.93561 19.686 10.4705 20.2211 11.2836L20.5673 11.8098L27.1278 21.2403L31.7622 13.8715L33.9368 10.4011C35.7914 7.4413 37.4593 4.74834 40.8388 3.86606V3.86606C42.4322 3.4501 45.7806 2.32666 46.1198 3.93807C46.502 5.75417 46.5006 9.32014 46.5006 11.5122Z" fill="url(#paint0_linear_278_26)"/>
    <path d="M66.1394 45.465C63.2563 45.465 60.6988 44.907 58.4668 43.791C56.2658 42.644 54.5297 41.0784 53.2587 39.0944C51.9877 37.1104 51.3522 34.8319 51.3522 32.2588C51.3522 29.6858 51.9877 27.4073 53.2587 25.4232C54.5297 23.4392 56.2658 21.8892 58.4668 20.7732C60.6988 19.6572 63.2563 19.0991 66.1394 19.0991C69.0224 19.0991 71.58 19.6572 73.812 20.7732C76.044 21.8892 77.78 23.4392 79.0201 25.4232C80.2911 27.4073 80.9266 29.6858 80.9266 32.2588C80.9266 34.8319 80.2911 37.1104 79.0201 39.0944C77.78 41.0784 76.044 42.644 73.812 43.791C71.58 44.907 69.0224 45.465 66.1394 45.465ZM66.1394 37.2809C66.9144 37.2809 67.6119 37.0949 68.2319 36.7229C68.8519 36.3509 69.3479 35.7929 69.7199 35.0489C70.0919 34.2739 70.2779 33.3438 70.2779 32.2588C70.2779 31.1428 70.0919 30.2283 69.7199 29.5153C69.3479 28.7713 68.8519 28.2133 68.2319 27.8413C67.6119 27.4693 66.9144 27.2833 66.1394 27.2833C65.3644 27.2833 64.6669 27.4693 64.0469 27.8413C63.4269 28.2133 62.9308 28.7713 62.5588 29.5153C62.1868 30.2283 62.0008 31.1428 62.0008 32.2588C62.0008 33.3438 62.1868 34.2739 62.5588 35.0489C62.9308 35.7929 63.4269 36.3509 64.0469 36.7229C64.6669 37.0949 65.3644 37.2809 66.1394 37.2809ZM97.6545 45.465C94.7714 45.465 92.2139 44.907 89.9819 43.791C87.7808 42.644 86.0448 41.0784 84.7738 39.0944C83.5028 37.1104 82.8673 34.8319 82.8673 32.2588C82.8673 29.6858 83.5028 27.4073 84.7738 25.4232C86.0448 23.4392 87.7808 21.8892 89.9819 20.7732C92.2139 19.6572 94.7714 19.0991 97.6545 19.0991C100.538 19.0991 103.095 19.6572 105.327 20.7732C107.559 21.8892 109.295 23.4392 110.535 25.4232C111.806 27.4073 112.442 29.6858 112.442 32.2588C112.442 34.8319 111.806 37.1104 110.535 39.0944C109.295 41.0784 107.559 42.644 105.327 43.791C103.095 44.907 100.538 45.465 97.6545 45.465ZM97.6545 37.2809C98.4295 37.2809 99.127 37.0949 99.747 36.7229C100.367 36.3509 100.863 35.7929 101.235 35.0489C101.607 34.2739 101.793 33.3438 101.793 32.2588C101.793 31.1428 101.607 30.2283 101.235 29.5153C100.863 28.7713 100.367 28.2133 99.747 27.8413C99.127 27.4693 98.4295 27.2833 97.6545 27.2833C96.8795 27.2833 96.1819 27.4693 95.5619 27.8413C94.9419 28.2133 94.4459 28.7713 94.0739 29.5153C93.7019 30.2283 93.5159 31.1428 93.5159 32.2588C93.5159 33.3438 93.7019 34.2739 94.0739 35.0489C94.4459 35.7929 94.9419 36.3509 95.5619 36.7229C96.1819 37.0949 96.8795 37.2809 97.6545 37.2809ZM114.574 45V38.9549L128.105 23.8887L129.826 27.2368H114.946V19.5641H138.336V25.6092L124.804 40.6754L123.083 37.3274H138.847V45H114.574ZM142.024 45V19.5641H152.533V45H142.024ZM147.278 17.5181C145.356 17.5181 143.822 17.0066 142.675 15.9836C141.528 14.9606 140.954 13.6896 140.954 12.1705C140.954 10.6515 141.528 9.38051 142.675 8.3575C143.822 7.33448 145.356 6.82298 147.278 6.82298C149.2 6.82298 150.735 7.30348 151.882 8.2645C153.029 9.22551 153.602 10.4655 153.602 11.9845C153.602 13.5966 153.029 14.9296 151.882 15.9836C150.735 17.0066 149.2 17.5181 147.278 17.5181ZM165.98 40.8149L166.212 28.4458L175.001 19.5641H187.416L175.791 31.7473L170.537 35.9789L165.98 40.8149ZM157.191 45V10.4965H167.7V45H157.191ZM175.559 45L168.584 36.1649L175.047 28.2133L188.253 45H175.559ZM205.278 45V40.4894L204.534 39.2804V30.7243C204.534 29.4843 204.147 28.5388 203.372 27.8878C202.628 27.2368 201.403 26.9113 199.698 26.9113C198.551 26.9113 197.389 27.0973 196.211 27.4693C195.033 27.8103 194.025 28.2908 193.188 28.9108L189.84 21.9822C191.328 21.0522 193.111 20.3392 195.188 19.8432C197.265 19.3471 199.295 19.0991 201.279 19.0991C205.65 19.0991 209.029 20.0757 211.416 22.0287C213.834 23.9817 215.044 27.0818 215.044 31.3288V45H205.278ZM198.071 45.465C195.994 45.465 194.258 45.1085 192.863 44.3955C191.468 43.6825 190.414 42.737 189.701 41.559C188.988 40.3499 188.631 39.0169 188.631 37.5599C188.631 35.9169 189.05 34.5219 189.887 33.3748C190.724 32.2278 191.995 31.3598 193.7 30.7708C195.436 30.1818 197.621 29.8873 200.256 29.8873H205.557V34.9559H201.93C200.814 34.9559 199.993 35.1419 199.466 35.5139C198.97 35.8549 198.722 36.3819 198.722 37.0949C198.722 37.6839 198.939 38.1799 199.373 38.5829C199.838 38.9549 200.458 39.1409 201.233 39.1409C201.946 39.1409 202.597 38.9549 203.186 38.5829C203.806 38.1799 204.255 37.5599 204.534 36.7229L205.883 39.8384C205.48 41.7295 204.627 43.14 203.325 44.07C202.023 45 200.272 45.465 198.071 45.465Z" fill="#ECFFE3"/>
    <defs>
    <linearGradient id="paint0_linear_278_26" x1="23.2503" y1="2.85364" x2="23.2503" y2="62.0024" gradientUnits="userSpaceOnUse">
    <stop stop-color="#00CF9D"/>
    <stop offset="1" stop-color="#00561D"/>
    </linearGradient>
    </defs>
    </svg>

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
      <ul class="navbar-nav ms-auto my-2 my-lg-0 col-12 col-lg-6 d-flex flex-row justify-content-lg-end justify-content-center align-items-center">
        <li class="not-connected-nav-item nav-item text-center me-3  me-lg-0">
          <a class="nav-link active" aria-current="page" href="#" data-bs-toggle="modal" data-bs-target="#login-modal" onclick="resetModalsInputs()" >Login</a
          >
        </li>
        <li class="not-connected-nav-item nav-item text-center">
          <button class="btn btn-outline-light rounded-pill px-4 ms-lg-2" data-bs-toggle="modal" data-bs-target="#signup-modal" onclick="resetModalsInputs()">
            Signup
          </button>
        </li>
        <li class="connected-nav-item nav-item d-flex align-items-center justify-content-center mt-3 mt-lg-0 me-3">
          <a href="./orderPage.html" class="text-decoration-none">
            <div
              class="icon-wrapper position-relative d-flex align-items-center justify-content-center rounded-circle  mx-auto"
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
        <div class="connected-nav-item nav-item mt-3 mt-lg-0 me-3">
          <a
            href="./profile.html"
            class="text-decoration-none"
          >
            <div
              class="icon-wrapper d-flex align-items-center justify-content-center rounded-circle mx-auto"
            >
              <i class="fa-solid fa-user"></i>
            </div>
          </a>
        </div>
        <li class="connected-nav-item nav-item mt-3 mt-lg-0">
          <a
            class="nav-link active text-center"
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

const onClearNavbarSearch = () => {
  $("#navbar input").val("");
  closeSuggestions();
};

const setSuggestions = (inputValue) => {
  const suggestions = ALL_SONGS.filter(
    (song) =>
      song.title.toLowerCase().includes(inputValue.toLowerCase()) ||
      song.artist.toLowerCase().includes(inputValue.toLowerCase())
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

  document.querySelector("#serach-total-result").innerHTML = suggestions.length;
  // console.log("suggestions:",suggestions);
};

const getSuggestion = (imgUrl, title, artist, id) => {
  const a = document.createElement("a");
  a.classList +=
    "serach-list-item d-flex align-items-center text-decoration-none";
  a.href = `./SongPage.html?songId=${id}`;
  a.innerHTML = `
  <div class="col-3 d-flex align-items-center justify-content-center p-3">
    <img src="${imgUrl}" alt="${title} image" class="w-100 rounded-1">
  </div>
  <div class="result-content col-9 d-flex justify-content-between align-items-center p-3">
    <span class="fw-medium text-dark col-6">${title}</span>
    <span class="text-99 col-6 text-end">${artist}</span>
  </div>`;

  return a;
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

const navbarWrapper = () => {
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
      ALL_SONGS = res;
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
        console.log(
          element.parentElement.parentElement.querySelector("button").click()
        );
      }
    });
  });
};

window.onload = function() { navbarWrapper() };
window.onunload = function(){};