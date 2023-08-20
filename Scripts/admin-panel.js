const handleBack = () => {
  window.history.back();
};

const onUserClicked = async (element) => {
  const current_user = adminPanel_ALL_USERS.find(
    (user) => user._id === element.getAttribute("data-id")
  );
  
  document
    .querySelector("#users-modal")
    .setAttribute("data-id", current_user._id);
  document.querySelector("#user-modal-userfullname").innerHTML =
    current_user.name;
  document.querySelector("#user-edit-fullname").value = current_user.name;
  document.querySelector("#user-edit-email").value = current_user.email;
  document.querySelector("#user-edit-password").value = current_user.password;

 $.ajax({
    url: `http://localhost:6969/orders/user/${current_user._id}`,
    type: "GET",
    secure: true,
    cors: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  })
    .done(function (res) {
      console.log("get res", res);
      document.querySelector("#user-total-orders").innerHTML = res.length;
      let songCounter = 0
      res.forEach(result => {
        songCounter += result.songs.length
      })
      document.querySelector("#user-total-songs").innerHTML =songCounter;
    })
    .fail(function () {
      console.log("user orders failed");
      return [];
    });

//   console.log("out of ajax:", userOrders);

  $("#users-modal").modal("show");
  console.log(current_user);
};

const onDeleteUser = () => {
    const current_user = adminPanel_ALL_USERS.find(
        (user) => user._id === document.querySelector("#users-modal").getAttribute("data-id"))

  $.ajax({
    url: `http://localhost:6969/users/${current_user._id}`,
    type: "DELETE",
    secure: true,
    cors: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    data: {
        token: localStorage.getItem("user")
    }
  }).done(function() {
    window.location.reload()
  }).fail(function() {
    showModalError();
  })

};

const onSaveUser = () => {
  const current_user = adminPanel_ALL_USERS.find(
    (user) =>
      user._id ===
      document.querySelector("#users-modal").getAttribute("data-id")
  );
  const updatedUser = {
    name: document.querySelector("#user-edit-fullname").value,
    email: document.querySelector("#user-edit-email").value,
    password: document.querySelector("#user-edit-password").value,
    orders: current_user.orders,
    songs: current_user.songs,
    isAdmin: current_user.isAdmin,
  };
  $.ajax({
    url: `http://localhost:6969/users/${current_user._id}`,
    type: "PUT",
    secure: true,
    cors: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    data: {
      token: localStorage.getItem("user"),
      updatedUser: updatedUser,
    },
  })
    .done(function () {
      window.location.reload();
    })
    .fail(function () {
      showModalError();
    });

  console.log(
    `user save: ${document
      .querySelector("#users-modal")
      .getAttribute("data-id")}`
  );
};

const setNumberOfUsers = (numOfTotalUsers) => {
  document.querySelector("#total-users-number").innerHTML = numOfTotalUsers;
};
const setNumberOfSongs = (numOfTotalSongs) => {
  document.querySelector("#total-songs-number").innerHTML = numOfTotalSongs;
};

const setUsersList = (usersList) => {
    $("#users .list-title span").text(`${usersList.length}`)
  const rowElement = document.querySelector("#all-users-list .row-list");
  rowElement.innerHTML = "";
  usersList.forEach((element) => {
    const col12 = document.createElement("div");
    col12.classList += "col-12 px-2 py-0";
    col12.innerHTML = `<div class="list-item p-1 d-flex justify-content-between align-items-center" data-id="${element._id}" onclick="onUserClicked(this)">
        <span>${element.name}</span>
        <i class="fa-solid fa-pen-to-square"></i>
    </div>`;
    rowElement.appendChild(col12);
  });
};
const setSongsList = (songsList) => {
  $("#songs .list-title span").text(songsList.length);
  const rowElement = document.querySelector("#all-songs-list .row-list");
  rowElement.innerHTML = "";
  songsList.forEach((element) => {
    const col12 = document.createElement("div");
    col12.classList += "col-12 px-2 py-0";
    col12.innerHTML = `<div class="list-item p-1 d-flex justify-content-between align-items-center" data-id="${element._id}" onclick="onUserClicked(this)">
        <span>${element.title}</span>
        <i class="fa-solid fa-pen-to-square"></i>
    </div>`;
    rowElement.appendChild(col12);
  });
};

const onSearchUser = (element) => {
  setUsersList(
    adminPanel_ALL_USERS.filter((user) =>
      user.name.toLowerCase().includes(element.value.toLowerCase())
    )
  );
};
const onSearchSong = (element) => {
  setSongsList(
    adminPanel_ALL_SONGS.filter((song) =>
      song.title.toLowerCase().includes(element.value.toLowerCase())
    )
  );
};

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
    adminPanel_ALL_USERS = res;
    setUsersList(adminPanel_ALL_USERS);
    setNumberOfUsers(adminPanel_ALL_USERS.length);
    console.log("users:", adminPanel_ALL_USERS);
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
    adminPanel_ALL_SONGS = res;
    setSongsList(adminPanel_ALL_SONGS);
    setNumberOfSongs(adminPanel_ALL_SONGS.length);
    console.log("songs:", adminPanel_ALL_SONGS);
  })
  .fail(function () {
    console.log("error - GET ALL USERS");
  });

let adminPanel_ALL_USERS = [];
let adminPanel_ALL_SONGS = [];
let adminPanel_ALL_ORDERS = [];
// $(document).ready(() => {
//   $("#users-modal").modal("show");
// });
