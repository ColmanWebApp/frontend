const handleBack = () => {
  window.history.back();
};

const getCurrentUserOrdersPrice = () => {
  const current_user = adminPanel_ALL_USERS.find(
    (user) =>
      user._id ===
      document.querySelector("#users-modal").getAttribute("data-id")
  );
  const currentUserSongs = [];
  for (let i = 0; i < adminPanel_ALL_SONGS.length; i++) {
    // todo: delete this if after change the data
    if (!adminPanel_ALL_SONGS[i]._id) {
      continue;
    }

    for (let j = 0; j < current_user.songs.length; j++) {
      if (adminPanel_ALL_SONGS[i]._id === current_user.songs[j]) {
        currentUserSongs.push(adminPanel_ALL_SONGS[i]);
        break;
      }
    }
  }
  let songsValue = 0;
  currentUserSongs.forEach((song) => {
    songsValue = songsValue - 0 + song.price;
  });
  return songsValue;
};

const getUserById = (userId) => {
  for (let index = 0; index < adminPanel_ALL_USERS.length; index++) {
    if (!adminPanel_ALL_USERS[index]) {
      continue;
    }
    if (adminPanel_ALL_USERS[index]._id === userId) {
      return adminPanel_ALL_USERS[index];
    }
  }

  return { name: "NoName" };
};

const getOrderPrice = (orderId) => {
  const order = adminPanel_ALL_ORDERS.find((ord) => ord._id === orderId);
  let totalPrice = 0;

  for (let i = 0; i < order.songs.length; i++) {
    for (let j = 0; j < adminPanel_ALL_SONGS.length; j++) {
      if (!adminPanel_ALL_SONGS[j]._id) continue;
      if (adminPanel_ALL_SONGS[j]._id === order.songs[i])
        totalPrice = totalPrice - 0 + adminPanel_ALL_SONGS[j].price;
    }
  }
  return totalPrice;
};

const getOrderDateAsString = (date) => {
  const dmy = date.split("T")[0].split("-");
  return `${dmy[2]}.${dmy[1]}.${dmy[0]}`;
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

  $("#user-total-orders").text(current_user.orders.length);
  $("#user-total-songs").text(current_user.songs.length);

  const songsValue = getCurrentUserOrdersPrice();
  $("#user-total-orders-cost").text(songsValue.toFixed(2));
  $("#user-avg-per-order").text(
    (songsValue / current_user.orders.length).toFixed(2)
  );

  $("#users-modal").modal("show");
  console.log(current_user);
};

const onDeleteUser = () => {
  const current_user = adminPanel_ALL_USERS.find(
    (user) =>
      user._id ===
      document.querySelector("#users-modal").getAttribute("data-id")
  );

  $.ajax({
    url: `http://localhost:6969/users/${current_user._id}`,
    type: "DELETE",
    secure: true,
    cors: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    data: {
      token: localStorage.getItem("user"),
    },
  })
    .done(function () {
      window.location.reload();
    })
    .fail(function () {
      showModalError();
    });
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
const setNumberOfOrders = (numOfTotalOrders) => {
  document.querySelector("#total-orders-number").innerHTML = numOfTotalOrders;
};

const setIncomes = (ordersList) => {
  let totalIncome = 0;
  ordersList.forEach((order) => {
    totalIncome = totalIncome - 0 + getOrderPrice(order._id);
  });
  let avgIncome = totalIncome / ordersList.length;
  if (!avgIncome) avgIncome = 0;

  $("#total-income").text(totalIncome.toFixed(2));
  $("#avg-income").text(avgIncome.toFixed(2));
};

const setUsersList = (usersList) => {
  $("#users .list-title span").text(`${usersList.length}`);
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

const setOrdersList = (ordersList) => {
  $("#orders .list-title span").text(ordersList.length);
  const rowElement = document.querySelector("#all-orders-list .row-list");
  rowElement.innerHTML = "";
  ordersList.forEach((element) => {
    const col12 = document.createElement("div");
    col12.classList += "col-12 px-2 py-0";
    col12.innerHTML += `<div class="list-item p-1 d-flex justify-content-between align-items-center" data-id="${
      element._id
    }" onclick="onUserClicked(this)">
        <div class="col-10 d-flex justify-content-between">
            <span class="me-3">${getOrderDateAsString(element.date)}</span>
            <span class="me-3">${getUserById(element.user).name}</span>
            <span>${getOrderPrice(element._id)}$</span>
        </div>
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
const onSearchOrder = (element) => {
  console.log(element.value);
};

// get all users
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

// get all songs
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

$.ajax({
  url: `http://localhost:6969/orders/`,
  type: "GET",
  secure: true,
  cors: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
}).done(function (res) {
  adminPanel_ALL_ORDERS = res;
  setNumberOfOrders(adminPanel_ALL_ORDERS.length);
  setIncomes(adminPanel_ALL_ORDERS);
  setOrdersList(adminPanel_ALL_ORDERS);
  console.log("orders:", adminPanel_ALL_ORDERS);
});

let adminPanel_ALL_USERS = [];
let adminPanel_ALL_SONGS = [];
let adminPanel_ALL_ORDERS = [];
// $(document).ready(() => {
//   $("#users-modal").modal("show");
// });
