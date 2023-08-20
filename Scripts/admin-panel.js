const handleBack = () => {
  window.history.back();
};

const onUserClicked = (element) => {
  $("#users-modal").modal("show");
  console.log(element.getAttribute("data-id"));
};

const setUsersList = () => {
    const rowElement = document.querySelector("#all-users-list .row");
    adminPanel_ALL_USERS.forEach(element => {
        const col12 = document.createElement("div")
        col12.classList += "col-12 px-2 py-0"
        col12.innerHTML = `<div class="list-item p-1 d-flex justify-content-between align-items-center" data-id="${element._id}" onclick="onUserClicked(this)">
        <span>${element.name}</span>
        <i class="fa-solid fa-pen-to-square"></i>
    </div>`
        rowElement.appendChild(col12)
    });
}

$.ajax({
  url: `http://localhost:6969/users/`,
  type: "GET",
  secure: true,
  cors: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
})
  .done(function (res) {
    adminPanel_ALL_USERS = res
    setUsersList()
    console.log("users:",adminPanel_ALL_USERS);
  })
  .fail(function () {
    console.log("error - GET ALL USERS");
  });

  $.ajax({
    url: `http://localhost:6969/songs/`,
    type: "GET",
    secure: true,
    cors: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  })
    .done(function (res) {
      adminPanel_ALL_SONGS = res
    //   setUsersList()
      console.log("songs:",adminPanel_ALL_SONGS);
    })
    .fail(function () {
      console.log("error - GET ALL USERS");
    });

  let adminPanel_ALL_USERS = []
  let adminPanel_ALL_SONGS = []
  let adminPanel_ALL_ORDERS = []