
function createCard(title,album,artist,genere,year,duration,price){
    const item=`
    <div class="song-container container">
        <div class="row h-100">
            <div class="col-3 song-image"></div>
            <div class="col-9">
                <div class="song-info">
                        <h1>${title}</h1>
                    <div class="song-description">
                        <p>${album}</p>
                        <p>${artist}</p>
                        <p>${genere}</p>
                        <p>${year}</p>
                        <p>${duration}</p>
                        <div class="row d-flex preview">
                                <div class="col-1 preview-button btn btn-outline-light">Play</div>
                                 <div class="col-1 preview-text">Preview</div>
                        </div> 
                    </div>
                    <div class="row add-to-cart d-flex justify-content-end">
                        <div class="col-1 price">${price}$</div>
                        <div class="col-3 add-to-cart-button btn btn-outline-light">Add to cart</div>

                    </div>
                </div>
            </div>
        </div>
    </div>`
    const card=$(item)
    $(".SongCard").append(card)
}
$(document).ready(function(){
    createCard("Lehem Havita","chilldugo","quzzaa","shlakot","6969","69:69","99.99")
    createCard("Lehem ","chill","quaa","ot","6969","69:69","99.99")
    createCard(" Havita","dugo","quzz","shlak","6969","69:69","99.99")
})