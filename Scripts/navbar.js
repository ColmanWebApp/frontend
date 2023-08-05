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
    let connected = false; // check if connected
    return connected;
}



userBtnsCreator();