const setMySongs = () => {
  document.querySelector("#num-of-songs").innerHTML = songs.length;
  const mySongsListElement = document.querySelector("#my-songs-list");
  mySongsListElement.innerHTML = "";
  songs.forEach((element) => {
    mySongsListElement.append(
      createSongItem(element.title, element.artist, element._id)
    );
  });
};

const createSongItem = (songTitle, artist, songId) => {
  const a = document.createElement("a");
  a.href = `./SongPage.html?songId=${songId}`; // todo: add correct link to song page
  a.classList +=
    "text-decoration-none song-item row p-2 d-flex align-items-center justify-content-between rounded-2";
  a.innerHTML = `<div class="col-auto">
                        <p class="m-0 p-0 fw-medium text-light">${songTitle}</p>
                    </div>
                    <div class="col-auto">
                        <p class="m-0 p-0 text-99">${artist}</p>
                    </div>`;
  return a;
};

const setMyOrders = () => {
  document.querySelector("#num-of-orders").innerHTML = orders.length;
  const myOrdersListElement = document.querySelector("#my-orders-list");
  myOrdersListElement.innerHTML = "";
  orders.forEach((element) => {
    myOrdersListElement.append(
      createOrderItem(element.date, element.songs, element._id)
    );
  });
};

const createOrderItem = (date, songs, orderId) => {
  date = date.split("T")[0];
  const splitedDate = date.split("-");
  const div = document.createElement("div");
  div.classList += "order-item row p-2 rounded-2 collapsed";
  div.setAttribute("data-bs-toggle", "collapse");
  div.setAttribute("data-bs-target", `#${orderId}`);
  div.innerHTML = `<div class="col-12">
  <div class="row d-flex align-items-center justify-content-between">
    <div class="col-auto">
      <span class="text-99 me-4">${splitedDate[2]}.${splitedDate[1]}.${
    splitedDate[0]
  }</span>
      <span class="text-99 me-4">${songs.length} Songs</span>
      <span class="text-99">$${getTotalPrice(songs)}</span>
    </div>
    <div class="col-auto">
      <i class="fa-solid fa-chevron-down"></i>
    </div>
  </div>
</div>
<div class="collapse px-3" id="${orderId}">
    ${createSongsForOrder(songs)}
</div>`;

  return div;
};

const createSongsForOrder = (songs) => {
  let songsForOrders = "";

  songs.forEach((element) => {
    songsForOrders += `<div class="px-2 py-0 d-flex justify-content-between">
        <span class="col-4 fw-medium">${element.title}</span>
        <span class="col-4 text-center text-99">${element.artist}</span>
        <span class="col-4 text-end text-99">$${element.price}</span>
    </div>`;
  });

  return songsForOrders;
};

const getTotalPrice = (songs) => {
  let total = 0;
  songs.forEach((element) => {
    total = total - 0 + element.price;
  });
  return total.toFixed(2);
};

const handlePermissions = () => {
  const user = localStorage.getItem("user");
  if (!user || user.length <= 0) {
    window.location.replace("./");
  }
};

const onOpenEdit = () => {
  unshowModalError();
  document.querySelector("#edit-fullname").value = user.name;
  document.querySelector("#edit-email").value = user.email;
  document.querySelector("#edit-password").value = "";
  $("#edit-profile-modal").modal("show");
};

const onSaveEdit = () => {
  const editedNameElement = document.querySelector("#edit-fullname");
  const editedEmailElement = document.querySelector("#edit-email");
  const editedPasswordElement = document.querySelector("#edit-password");
  const updatedUser = {
    name: editedNameElement.value,
    email: editedEmailElement.value,
    password: editedPasswordElement.value,
  };

  $.ajax({
    url: `https://moozika.onrender.com/users/`,
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
      $("#edit-profile-modal").modal("hide");
      window.location.reload();
    })
    .fail(function () {
      showModalError();
    });

  //   todo: ajax to update the user
};

const handleBack = () => {
  window.history.back();
};

const setProfilePage = () => {
  document.querySelector("#user-full-name").innerHTML = user.name;
  document.querySelector("#user-email").innerHTML = user.email;
  if (user.isAdmin) {
    document.querySelector("#admin-panel-wrapper").classList.add("d-block");
    document.querySelector("#admin-panel-wrapper").classList.remove("d-none");
  } else {
    document.querySelector("#admin-panel-wrapper").classList.add("d-none");
    document.querySelector("#admin-panel-wrapper").classList.remove("d-block");
  }

  setMySongs();
  setMyOrders();
};

const setUserDetails = async () => {
  await $.ajax({
    url: `https://moozika.onrender.com/users/user-details`,
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
    .fail(function (err) {
      if (err.status === 403) {
        localStorage.clear();
        window.location.replace("./404.html");
      }
      return;
    })
    .done(function (res) {
      user = res;
      orders = user.orders;
      orders.forEach((element) => {
        songs = [...songs, ...element.songs];
      });
      
    });
};

const setPage = async () => {
  handlePermissions();
  await setUserDetails();
  setProfilePage();
  $("#navbar").removeClass("d-none");
  $("#content").removeClass("d-none");
  $("#footer").removeClass("d-none");
  $("#loader").addClass("d-none");
};

function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 32.178124, lng: 34.915441 }, // Center the map
      zoom: 10 // Adjust the zoom level as needed
  });
  const infoWindow = new google.maps.InfoWindow();
  const image = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";
  let points = [];
  $.ajax({
    url: `https://moozika.onrender.com/locations/`,
    type: "GET",
    secure: true,
    cors: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  }).done(function (res) {
    res.forEach((element) => {
      points.push({ lat: element.latitude, lng: element.longitude, name: element.name });
    });
    for (let i = 0; i < points.length; i++) {
      let point = points[i];
      const marker = new google.maps.Marker({
          position: { lat: point.lat, lng: point.lng },
          map,
          title: point.name,
          label: `${i+1}`,
          optimized: false
          //icon: image, // Red pin icon
          
      });
      


      marker.addListener("click", () => {
        infoWindow.close();
        infoWindow.setContent(marker.getTitle());
        infoWindow.open(marker.getMap(), marker);
      });


      marker.setMap(map);
    }
  });
  // Loop through the points and create a red pin for each one
  
  

}


// function initMap() {
//   const map = new google.maps.Map(document.getElementById("map"), {
//     zoom: 4,
//     center: { lat: -33, lng: 151 },
//   });
//   const image =
//     "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
//   const beachMarker = new google.maps.Marker({
//     position: { lat: -33.89, lng: 151.274 },
//     map,
//     icon: image,
//   });
// }

setPage();
initMap();
let user;
let orders;
let songs = [];
