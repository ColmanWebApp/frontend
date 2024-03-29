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

  return { name: "Deleted User" };
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
  if (current_user.isAdmin)
    document.querySelector("#user-edit-is-admin").setAttribute("checked", "");
  else document.querySelector("#user-edit-is-admin").removeAttribute("checked");

  $("#user-total-orders").text(current_user.orders.length);
  $("#user-total-songs").text(current_user.songs.length);

  const songsValue = getCurrentUserOrdersPrice();
  $("#user-total-orders-cost").text(songsValue.toFixed(2));
  const avg =
    songsValue / current_user.orders.length
      ? songsValue / current_user.orders.length
      : 0;
  $("#user-avg-per-order").text(avg.toFixed(2));
  unshowModalError()
  $("#users-modal").modal("show");
};

const onSongClicked = (songElement) => {
  clearSongModalInputs();
  const song = adminPanel_ALL_SONGS.find(
    (s) => s._id === songElement.getAttribute("data-id")
  );
  $("#song-modal-title").text(song.title);
  document.querySelector("#song-modal-delete-btn").classList.remove("d-none");
  document.querySelector("#song-edit-title").value = song.title;
  document.querySelector("#song-edit-artist").value = song.artist;
  document.querySelector("#song-edit-album").value = song.album;
  document.querySelector("#song-edit-year").value = song.year;
  const songDurationInSeconds = song.duration / 1000;
  const songDurationMinutes = parseInt(songDurationInSeconds / 60).toFixed(0);
  const songDurationSeconds = parseInt(songDurationInSeconds % 60).toFixed(0);
  document.querySelector("#song-edit-duration").value = `${
    songDurationMinutes >= 10 ? songDurationMinutes : "0" + songDurationMinutes
  }:${
    songDurationSeconds >= 10 ? songDurationSeconds : "0" + songDurationSeconds
  }`;

  document.querySelector("#song-edit-price").value = song.price;
  document.querySelector("#song-edit-num-of-purchases").value = `Number Of Purchases: ${song.numOfPurchases}`;
  document.querySelector("#song-edit-album-image").value = song.album_image;
  document.querySelector("#song-edit-preview").value = song.preview_url;
  document.querySelector("#song-edit-youtube-id").value = song.youtube_id;

  song.genre.forEach((genre) => {
    document.querySelector("#song-edit-genres").value = genre;
    onAddGenre();
  });

  $("#song-action").text("EDIT SONG");
  document
    .querySelector("#songs-modal")
    .setAttribute("data-song-id", songElement.getAttribute("data-id"));
  document
    .querySelector("#song-modal-save-btn")
    .setAttribute("onclick", "onSaveSongsChanges()");
  $("#song-modal-save-btn").text("Save Changes");
  unshowModalError()
  $("#songs-modal").modal("show");
};

const onOrderClicked = (element) => {
  const orderId = element.getAttribute("data-id");
  const order = adminPanel_ALL_ORDERS.find((order) => order._id === orderId);
  const orderDateArray = order.date.split("T")[0].split("-");
  const orderDate = `${orderDateArray[2]}.${orderDateArray[1]}.${orderDateArray[0]}`;
  const orderTimeArray = order.date.split("T")[1].split(".")[0].split(":");
  const orderTime = `${orderTimeArray[0]}:${orderTimeArray[1]}`;

  const user = adminPanel_ALL_USERS.find((user) => user._id === order.user);
  const songs = adminPanel_ALL_SONGS.filter((song) =>
    order.songs.includes(song._id)
  );

  $("#orders-modal-title").text(`${orderDate} | ${user?user.name:"Deleted User"}`);
  $("#order-edit-user").val(`${user?user.name:"Deleted User"} (${user?user.email:"Deleted User"})`);
  $("#order-edit-time").val(`${orderDate}, ${orderTime}`);
  $("#order-edit-price").val(`${getOrderPrice(orderId).toFixed(2)}`);

  const songsListElement = $("#order-songs-ul");
  songsListElement.html("");
  songs.forEach((song) => {
    const li = document.createElement("li");
    li.classList += "list-group-item border-end col-auto mb-2 px-3";
    li.setAttribute("onclick", "{this.remove()}");
    li.setAttribute("data-song-id", song._id);
    li.innerHTML = `<span>${song.title}</span>
                    <i class="fa-solid fa-xmark"></i>`;
    songsListElement.append(li);
  });

  const orderModal = $("#orders-modal");

  orderModal.attr("data-id", orderId);
  unshowModalError()
  orderModal.modal("show");
};

const onDeleteOrder = () => {
  const orderId = $("#orders-modal").attr("data-id");

  $.ajax({
    url: `https://moozika.onrender.com/admin/orders/${orderId}`,
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
    .fail(function (err) {
      showModalError();
    });
};

const onSaveOrder = () => {
  const orderId = $("#orders-modal").attr("data-id");
  const songsList = [];
  document.querySelectorAll("#order-songs-ul li").forEach((songName) => {
    songsList.push(songName.getAttribute("data-song-id"));
  });

  const updatedOrder = {
    songs: [...songsList],
  };

  $.ajax({
    url: `https://moozika.onrender.com/admin/orders/${orderId}`,
    type: "PUT",
    secure: true,
    cors: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    data: {
      token: localStorage.getItem("user"),
      updatedOrder: updatedOrder,
    },
  })
    .done(function () {
      window.location.reload();
    })
    .fail(function (err) {
      showModalError();
    });
};

const onAddSong = () => {
  clearSongModalInputs();
  document.querySelector("#song-modal-delete-btn").classList.add("d-none");

  $("#song-action").text("ADD SONG");
  document.querySelector("#songs-modal").removeAttribute("data-song-id");
  document
    .querySelector("#song-modal-save-btn")
    .setAttribute("onclick", "onSaveNewSong()");
  $("#song-modal-save-btn").text("Save New Song");
  $("#songs-modal").modal("show");
};

const getSongFromForm = () => {
  const durationFromInput = $("#song-edit-duration").val();
  const pattern = /^\d+:\d+$/;
  if(!pattern.test(durationFromInput) || ( parseInt(durationFromInput.split(":")[1]) < 0 || parseInt(durationFromInput.split(":")[1]) > 59 )) {
    showModalError()
    return
  }

  const durationMinSec = $("#song-edit-duration").val().split(":");
  const durationInMiliSeconds =
    (durationMinSec[0] * 60 - 0 + (durationMinSec[1] - 0)) * 1000;
  const genresList = [];
  document.querySelectorAll("#genres-ul li span").forEach((genre) => {
    genresList.push(genre.innerHTML.replace("amp;", ""));
  });

  const song = {
    title: $("#song-edit-title").val(),
    artist: $("#song-edit-artist").val(),
    album: $("#song-edit-album").val(),
    year: $("#song-edit-year").val(),
    duration: durationInMiliSeconds,
    price: $("#song-edit-price").val(),
    album_image:
      $("#song-edit-album-image").val() != ""
        ? $("#song-edit-album-image").val()
        : "https://www.freeiconspng.com/uploads/no-image-icon-4.png",
    preview_url: $("#song-edit-preview").val()
      ? $("#song-edit-preview").val()
      : undefined,
    genre: genresList,
    youtube_id: $("#song-edit-youtube-id").val(),
  };

  return song;
};

const onSaveSongsChanges = () => {
  const songId = document
    .querySelector("#songs-modal")
    .getAttribute("data-song-id");

  const updatedSong = getSongFromForm();

  $.ajax({
    url: `https://moozika.onrender.com/admin/songs/${songId}`,
    type: "PUT",
    secure: true,
    cors: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    data: {
      token: localStorage.getItem("user"),
      updatedSong: updatedSong,
    },
  })
    .done(function () {
      window.location.reload();
    })
    .fail(function () {
      showModalError();
    });

};

const onSaveNewSong = () => {
  $.ajax({
    url: `https://moozika.onrender.com/admin/songs/create`,
    type: "POST",
    secure: true,
    cors: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    data: {
      token: localStorage.getItem("user"),
      song: getSongFromForm(),
    },
  })
    .done(function () {
      window.location.reload();
    })
    .fail(function () {
      showModalError();
    });
};

const clearSongModalInputs = () => {
  document.querySelector("#genres-ul").innerHTML = "";
  $("#song-modal-title").text("");
  document.querySelector("#song-modal-delete-btn").classList.remove("d-none");
  document.querySelector("#song-edit-title").value = "";
  document.querySelector("#song-edit-artist").value = "";
  document.querySelector("#song-edit-album").value = "";
  document.querySelector("#song-edit-year").value = "";
  document.querySelector("#song-edit-duration").value = "";
  document.querySelector("#song-edit-price").value = "";
  document.querySelector("#song-edit-album-image").value = "";
  document.querySelector("#song-edit-preview").value = "";
  document.querySelector("#song-edit-youtube-id").value = "";
  document.querySelector("#song-edit-num-of-purchases").value = "Number Of Purchases: 0";
};

const onDeleteUser = () => {
  const current_user = adminPanel_ALL_USERS.find(
    (user) =>
      user._id ===
      document.querySelector("#users-modal").getAttribute("data-id")
  );

  $.ajax({
    url: `https://moozika.onrender.com/admin/users/${current_user._id}`,
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

const onDeleteSong = () => {
  const songId = document
    .querySelector("#songs-modal")
    .getAttribute("data-song-id");
  $.ajax({
    url: `https://moozika.onrender.com/admin/songs/${songId}`,
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
    isAdmin: document.querySelector("#user-edit-is-admin").checked,
  };
  $.ajax({
    url: `https://moozika.onrender.com/admin/users/${current_user._id}`,
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
    col12.innerHTML = `<div class="list-item p-1 d-flex justify-content-between align-items-center" data-id="${element._id}" onclick="onSongClicked(this)">
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
    }" onclick="onOrderClicked(this)">
        <div class="col-10 d-flex justify-content-between">
            <span class="col-4">${getOrderDateAsString(element.date)}</span>
            <span class="col text-center">${getUserById(element.user).name}</span>
            <span class="col-3 text-end">$${getOrderPrice(element._id).toFixed(2)}</span>
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
  setOrdersList(
    adminPanel_ALL_ORDERS.filter((order) => {
      return (
        getOrderDateAsString(order.date)
          .toLowerCase()
          .includes(element.value.toLowerCase()) ||
        getUserById(order.user)
          .name.toLowerCase()
          .includes(element.value.toLowerCase())
      );
    })
  );
};

const onDeleteGenre = (listItem) => {
  listItem.remove();
};

const onAddGenre = () => {
  const genreValue = document.querySelector("#song-edit-genres").value;
  if (genreValue === "") return;

  const li = document.createElement("li");
  li.classList += "list-group-item border-end col-auto mb-2 px-3";
  li.setAttribute("onclick", "onDeleteGenre(this)");
  li.innerHTML = `<span>${genreValue}</span>
  <i class="fa-solid fa-xmark"></i>`;

  document.querySelector("#genres-ul").appendChild(li);
  document.querySelector("#song-edit-genres").value = "";

};

// get all users
const getAllUsers = async () => {
  await $.ajax({
    url: `https://moozika.onrender.com/admin/users/`,
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
      adminPanel_ALL_USERS = res;
    })
    .fail(function (err) {
      if (err.status === 403 || err.status === 401) window.location.replace("./404.html");
    });
};
// get all songs
const getAllSongs = async () => {
  await $.ajax({
    url: `https://moozika.onrender.com/admin/songs/`,
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
      adminPanel_ALL_SONGS = res;
    })
    .fail(function (err) {
      if (err.status === 403 || err.status === 401) window.location.replace("./404.html");
      else window.location.replace("./");
    });
};

const getAllOrders = async () => {
  await $.ajax({
    url: `https://moozika.onrender.com/admin/orders/`,
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
      adminPanel_ALL_ORDERS = res.reverse();
    })
    .fail(function (err) {
      if (err.status === 403 || err.status === 401) window.location.replace("./404.html");
      else window.location.replace("./");
    });
};

let adminPanel_ALL_USERS = [];
let adminPanel_ALL_SONGS = [];
let adminPanel_ALL_ORDERS = [];
// $(document).ready(() => {
//   $("#songs-modal").modal("show");
// });

const setPage = async () => {
  const loader = document.querySelector("#loader");
  await getAllUsers();
  await getAllSongs();
  await getAllOrders();

  setUsersList(adminPanel_ALL_USERS);
  setNumberOfUsers(adminPanel_ALL_USERS.length);

  setSongsList(adminPanel_ALL_SONGS);
  setNumberOfSongs(adminPanel_ALL_SONGS.length);

  setNumberOfOrders(adminPanel_ALL_ORDERS.length);
  setIncomes(adminPanel_ALL_ORDERS);
  setOrdersList(adminPanel_ALL_ORDERS);

  loader.classList.add("d-none");
  document.querySelector("#navbar").classList.remove("d-none");
  document.querySelector("#content").classList.remove("d-none");
  document.querySelector("#footer").classList.remove("d-none");

  salesStatisticPerGenre();
  lastTenDaysSalesStatistics();
};

setPage();
