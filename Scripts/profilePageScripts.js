const setMySongs = () => {
  document.querySelector("#num-of-songs").innerHTML = mySongs.length;
  const mySongsListElement = document.querySelector("#my-songs-list");
  mySongsListElement.innerHTML = "";
  mySongs.forEach((element) => {
    mySongsListElement.append(
      createSongItem(element.title, element.artist, element.id)
    );
  });
};

const createSongItem = (songTitle, artist, songId) => {
  const a = document.createElement("a");
  a.href = "#";
  a.classList +=
    "text-decoration-none song-item row p-2 d-flex align-items-center justify-content-between rounded-3";
  a.innerHTML = `<div class="col-9">
                        <p class="m-0 p-0 fs-5 fw-medium text-light">${songTitle}</p>
                    </div>
                    <div class="col-auto">
                        <p class="m-0 p-0 text-99">${artist}</p>
                    </div>`;
  return a;
};

const setMyOrders = () => {
  document.querySelector("#num-of-orders").innerHTML = myOrders.length;
  const myOrdersListElement = document.querySelector("#my-orders-list");
  myOrdersListElement.innerHTML = "";
  myOrders.forEach((element) => {
    myOrdersListElement.append(
      createOrderItem(element.date, element.songs, element.id)
    );
  });
};

const createOrderItem = (date, songs, orderId) => {
  const div = document.createElement("div");
  div.classList += "order-item row p-2 rounded-3 collapsed";
  div.setAttribute("data-bs-toggle", "collapse");
  div.setAttribute("data-bs-target", `#${orderId}`);
  div.innerHTML = `<div class="col-12">
  <div class="row d-flex align-items-center justify-content-between">
    <div class="col-auto">
      <span class="text-99 me-4 fs-5">${date}</span>
      <span class="text-99 me-4">${songs.length} Songs</span>
      <span class="text-99">${getTotalPrice(songs)}$</span>
    </div>
    <div class="col-auto">
      <i class="fa-solid fa-chevron-down"></i>
    </div>
  </div>
</div>
<div class="collapse px-3 py-1" id="${orderId}">
    ${createSongsForOrder(songs)}
</div>`;

  return div;
};

const createSongsForOrder = (songs) => {
    let songsForOrders = ""

    songs.forEach(element => {
        songsForOrders += `<div class="px-2 py-0 d-flex justify-content-between">
        <span class="me-3 fw-medium">${element.title}</span>
        <span class="me-3 text-99">${element.artist}</span>
        <span class="text-99">${element.price}$</span>
    </div>`
    });

    return songsForOrders
}


const getTotalPrice = (songs) =>{
    let total = 0;
    songs.forEach(element => {
        total = total - 0 + element.price
    });
    return total.toFixed(2)
}

// todo: mySongs \/ get from DB
const mySongs = [
  { id: 1, title: "Song #1", artist: "artist" },
  { id: 2, title: "Song #2", artist: "artist" },
  { id: 3, title: "Song #3", artist: "artist" },
  { id: 4, title: "Song #4", artist: "artist" },
  { id: 5, title: "Song #5", artist: "artist" },
  { id: 6, title: "Song #6", artist: "artist" },
];

const myOrders = [
  {
    date: "14.08.2023",
    songs: [
      { id: 1, title: "Song #1", artist: "artist", price: 19.99 },
      { id: 2, title: "Song #2", artist: "artist", price: 19.99 },
      { id: 3, title: "Song #3", artist: "artist", price: 19.99 },
      { id: 4, title: "Song #4", artist: "artist", price: 19.99 },
      { id: 5, title: "Song #5", artist: "artist", price: 19.99 },
    ],
    id: "order-1",
  },
  {
    date: "14.08.2023",
    songs: [
      { id: 1, title: "Song #1", artist: "artist", price: 19.99 },
      { id: 2, title: "Song #2", artist: "artist", price: 19.99 },
    ],
    id: "order-2",
  },
];

setMySongs();
setMyOrders();
