const createNavbar = ()=> {
    document.querySelector("#navbar").innerHTML = 
    "<nav class='navbar navbar-expand-lg bg-dark navbar-dark py-3'><div class='container-fluid'><div class='flex-grow-1'><a class='navbar-brand fs-3 fw-bold' href='#'>MusicApp</a></div><button class='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarScroll' aria-controls='navbarScroll' aria-expanded='false' aria-label='Toggle navigation'><span class='navbar-toggler-icon'></span></button><div class='collapse navbar-collapse' id='navbarScroll'><form class='d-flex mt-3 mt-lg-0' role='search'><div class='navbar-input-wrapper w-75'><input class='form-control rounded-start-pill ps-5 search-input' type='search' placeholder='Search' aria-label='Search'></div><button class='btn btn-outline-light rounded-0 rounded-end-pill' type='submit'>Search</button></form><ul class='navbar-nav ms-auto my-2 my-lg-0gap-3'><li class='not-connected-nav-item nav-item'><a class='nav-link active' aria-current='page' href='#' onclick='onLogin()'>Login</a></li><li class='not-connected-nav-item nav-item'><button class='btn btn-outline-light rounded-pill px-4 ms-lg-2' onclick='onSignup()'>Signup</button> </li><li class='connected-nav-item nav-item mt-4 mt-lg-0'><div class='icon-wrapper position-relative d-flex align-items-center justify-content-center rounded-circle'> <i class='fa-solid fa-cart-shopping'></i><span class='position-absolute top-0 start-100 translate-middle badge rounded-circle bg-light text-dark' id='cart-badge'>0</span></div></li><div class='connected-nav-item nav-item mt-2 mt-lg-0'><div class='icon-wrapper d-flex align-items-center justify-content-center rounded-circle'><i class='fa-solid fa-user'></i></div></div><li class='connected-nav-item nav-item mt-2 mt-lg-0'><a class='nav-link active' aria-current='page' href='#' onclick='onLogout()'>Logout</a></li></ul></div></div></nav>"
}

const userBtnsCreator = ()=> {
    const connected = isMemberConnected();
    document.querySelectorAll(".not-connected-nav-item").forEach(element => {
        if(connected) {
            element.classList.add("d-none");
        }
        else{
            element.classList.remove("d-none");
        }
    });
    
    document.querySelectorAll(".connected-nav-item").forEach(element => {
        if(connected) {
            element.classList.remove("d-none");
        }
        else{
            element.classList.add("d-none");
        }
    });
}

const isMemberConnected = ()=> {
    let connected = true; // check if connected
    return connected;
}

const onLogout = ()=> {
    console.log("logout btn on navbar clicked");
}

const onLogin = ()=> {
    console.log("login btn on navbar clicked");
}

const onSignup = ()=> {
    console.log("signup btn on navbar clicked");
}

const onSearch = (event) => {
    console.log(event.value);
}


createNavbar();
userBtnsCreator();