const createNavbar = ()=> {
    document.querySelector('#navbar').innerHTML =
    `<nav class="navbar navbar-expand-lg bg-dark navbar-dark py-3">
    <div class="container-fluid">
        <div class="flex-grow-1">
            <a class="navbar-brand fs-3 fw-bold" href="#">MusicApp</a>
        </div>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
        
      <div class="collapse navbar-collapse" id="navbarScroll">
        <form class="d-flex mt-3 mt-lg-0" role="search">
            <div class="navbar-input-wrapper w-100">
                <input class="form-control rounded-pill ps-5 search-input border-0" type="search" placeholder="Search . . ." aria-label="Search" oninput="onSearch(this)">
            </div>
        </form>
        <ul class="navbar-nav ms-auto my-2 my-lg-0">
          <li class="not-connected-nav-item nav-item">
            <a class="nav-link active" aria-current="page" href="#" data-bs-toggle="modal" data-bs-target="#login-modal" onclick="resetModalsInputs()">Login</a>
          </li>
          <li class="not-connected-nav-item nav-item">
            <button class="btn btn-outline-light rounded-pill px-4 ms-lg-2" data-bs-toggle="modal" data-bs-target="#signup-modal" onclick="resetModalsInputs()">Signup</button>
          </li>
            <li class="connected-nav-item nav-item mt-4 mt-lg-0 me-lg-3">
                <div class="icon-wrapper position-relative d-flex align-items-center justify-content-center rounded-circle">
                    <i class="fa-solid fa-cart-shopping"></i>
                    <span class="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-light text-dark" id="cart-badge">
                        0
                    </span>
                </div>
            </li>
            <div class="connected-nav-item nav-item mt-2 mt-lg-0 me-lg-3">
                <div class="icon-wrapper d-flex align-items-center justify-content-center rounded-circle">
                    <i class="fa-solid fa-user"></i>
                </div>
            </div>
            <li class="connected-nav-item nav-item mt-2 mt-lg-0">
                    <a class="nav-link active" aria-current="page" href="#" onclick="onLogout()">Logout</a>
            </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="modal fade" id="login-modal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-4 fw-bold" id="exampleModalLabel">Login</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="alert alert-danger px-4 py-2 d-none" role="alert">
                Authentication failed. Please try again.
              </div>
          <div class="email input-wrapper mb-3">
            <i class="fa-solid fa-envelope input-icon"></i>
            <input class="modal-input px-5 py-2 w-100 rounded-pill" type="email" name="login-email" id="login-email" placeholder="Email">
          </div>
          <div class="password input-wrapper mb-3">
            <i class="fa-solid fa-lock input-icon"></i>
            <input class="modal-input px-5 py-2 w-100 rounded-pill" type="password" name="login-password" id="login-password" placeholder="Password">
          </div>
          <div class="login-btn d-flex flex-column align-items-center">
            <button class="btn text-light w-100 modal-btn rounded-pill" onclick="onLogin()">Login</button>
            <a href="#" class="text-decoration-none text-under-modal-btn mt-1" data-bs-toggle="modal" data-bs-target="#signup-modal" onclick="resetModalsInputs()">Not a member? Sign up</a>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="signup-modal" tabindex="-1" aria-labelledby="exampleModalLabel2" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-4 fw-bold" id="exampleModalLabel2">Signup</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="alert alert-danger px-4 py-2 d-none" role="alert">
                Oops! Something went wrong. Please try again.
              </div>
            <div class="email input-wrapper mb-3">
                <i class="fa-solid fa-user input-icon"></i>
                <input class="modal-input px-5 py-2 w-100 rounded-pill" type="text" name="signup-email" id="signup-fullname" placeholder="Full Name">
              </div>
          <div class="email input-wrapper mb-3">
            <i class="fa-solid fa-envelope input-icon"></i>
            <input class="modal-input px-5 py-2 w-100 rounded-pill" type="email" name="signup-email" id="signup-email" placeholder="Email">
          </div>
          <div class="password input-wrapper mb-3">
            <i class="fa-solid fa-lock input-icon"></i>
            <input class="modal-input px-5 py-2 w-100 rounded-pill" type="password" name="signup-password" id="signup-password" placeholder="Password - at least 8 characters">
          </div>
          <div class="login-btn d-flex flex-column align-items-center">
            <button class="btn text-light w-100 modal-btn rounded-pill" onclick="onSignup()">Signup</button>
            <a href="#" class="text-decoration-none text-under-modal-btn mt-1" data-bs-toggle="modal" data-bs-target="#login-modal" onclick="resetModalsInputs()">Already a member? Sign in</a>
          </div>
        </div>
      </div>
    </div>
  </div>`
}

const userBtnsCreator = ()=> {
    const connected = isMemberConnected();
    document.querySelectorAll('.not-connected-nav-item').forEach(element => {
        if(connected) {
            element.classList.add('d-none');
        }
        else{
            element.classList.remove('d-none');
        }
    });
    
    document.querySelectorAll('.connected-nav-item').forEach(element => {
        if(connected) {
            element.classList.remove('d-none');
        }
        else{
            element.classList.add('d-none');
        }
    });
}

const isMemberConnected = ()=> {
    let connected = false; // check if connected
    return connected;
}

const onLogout = ()=> {
    console.log('logout btn on navbar clicked');
}

const onLogin = ()=> {
    const emailInput = document.querySelector("#login-email");
    const passwordInput = document.querySelector("#login-password");
    // todo: login request to backend -> if true: redirect to home page, else: show an error to the user
    console.log("email: " + emailInput.value);
    console.log("password:" + passwordInput.value);
}

const onSignup = ()=> {
    const fullnameInput = document.querySelector("#signup-fullname");
    const emailInput = document.querySelector("#signup-email");
    const passwordInput = document.querySelector("#signup-password");
    // todo: signup request to backend -> if true: redirect to home page and connect, else: show an error to the user
    console.log("full name: " + fullnameInput.value);
    console.log("email: " + emailInput.value);
    console.log("password:" + passwordInput.value);
}

const onSearch = (event) => {
    console.log(event.value);
}

const resetModalsInputs = () => {
    document.querySelectorAll(".modal-input").forEach(element => {
        element.value = "";
    });
    document.querySelectorAll(".modal-body .alert").forEach(element => {
        element.classList.add("d-none");
    });
}


createNavbar();
userBtnsCreator();