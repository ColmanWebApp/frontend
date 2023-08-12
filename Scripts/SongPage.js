function createCard(song) {
  let preview="";
  if(song.preview_url)
    preview=`<div id="preview-bar" class="d-flex align-items-center mt-3">
    <video id="preview-sound-bar"controls name="media"><source src=${song.preview_url} type="audio/mpeg"></video>
    <p id="preview-text" class="p-0 m-0 ms-3">Preview</p>
    </div>`
  const card =`
  <div class="card song-card d-flex justify-content-center align-items-center mb-3 border-0">
    <div class="row song-items rounded-4 overflow-hidden w-75">
      <div class="col-md-4 m-0 p-0">
        <img src="${song.album_image}" class="img-fluid object-fit-cover h-100 w-100" alt=${song.title}" image">
      </div>
      <div class="col-md-8">
        <div class="card-body song-info p-5">
            <div class="song-description ">
              <h1 class="card-title text-light fw-bold">${song.title}</h1>
              <p class="card-text m-0 p-0 fs-4">${song.album}</p>
              <p class="card-text m-0 p-0 fs-4">${song.artist}</p>
              <p class="card-text m-0 p-0 fs-4">${song.genre}</p>
              <p class="card-text m-0 p-0 fs-4">${song.year}</p>
              <p class="card-text m-0 p-0 fs-4">${song.duration}</p>
              ${preview}
            </div>
            <div class="d-flex align-items-center justify-content-end add-to-cart mt-5">
              <div class="price fs-5 me-3">${song.price}$</div>
              <div onclick="addToCart('${song._id}')" class="px-5 add-to-cart-button btn btn-outline-light rounded-pill fs-5 ">Add to cart </div>
            </div>
        </div>
      </div>
    </div>
  </div>`;
  $(".song-container").append(card);
}
 function addToCart(songId){
  if(!localStorage.getItem("token"))
  {
    alert("You need to sign in,in order to add a song to the cart");
    return;
  }
  if(!songId)// or syntax= if (song==null)
  {
    alert("Invalid song");
    return;
  }
  const songsInCart= JSON.parse(localStorage.getItem("cart") || "[]"); // סינטקס בטח לא טוב-תביא לי מהלוקל סטורג' את העגלה-השירים שיש בה, אם אין תביא לי מערך ריק, תפרסר לגייסון ואז יש לנו את השירים בפורמט גייסון?
  if(songsInCart.includes(songId))
  {
    alert("The song is already in the cart");
    return;
  }
  songsInCart.push(songId);
  localStorage.setItem("cart",JSON.stringify(songsInCart));
}
$(document).ready( function () {
  const urlParams=window.location.search;
  const searchParams=new URLSearchParams(urlParams);
  if(searchParams.has("songId")) // add !
    //window.location.replace("/"); // remove from //
  console.log("no Id found")
  else{
    const songId= "64d67fed31b4f0938ee6d7a8"; // add later searchParams.get("songId")
    const myJson={
      url:`http://localhost:6969/songs/${songId}/`,
      type:'GET',
      contentType:'application/json',
      secure:true,
      cors:true,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
    }
    $.ajax(myJson)
    .done(function(res){
      createCard(res);
    })
    .fail(function(error){
      console.log("failed",error);
    });
  }
});
