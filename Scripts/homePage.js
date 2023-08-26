let AllData =  [];

$(document).ready(function () {
	$.ajax({
		url: "http://localhost:6969/songs",
		type: "GET",
		dataType: "json",
		success: function (data) {
			AllData = data
			.map(value => ({ value, sort: Math.random() }))
			.sort((a, b) => a.sort - b.sort)
			.map(({ value }) => value);
			$("#cards").html(LoadCardData(AllData));
			$("#bigCarousel").html(carousel(AllData));
			$("#genreDropdownMenu").html(generateGenreDropdownOptions(AllData));
			$("#priceDropdownMenu").html(generatePricesDropdownOptions);
		},
		error: function (err) {
				console.log(err);
		}
	});
	initSocket();
});

// Event listener to filter selected genres, price range, and has preview
$(document).on("change", "#genreDropdownMenu .genre-checkbox, #priceDropdownMenu .price-checkbox, #previewFilter", function() {
	const selectedGenres = $("#genreDropdownMenu .genre-checkbox:checked").map(function() {
			return $(this).val();
	}).get();

	const selectedPriceRange = $("#priceDropdownMenu .price-checkbox:checked").map(function() {
			return $(this).val();
	}).get();


	const hasPreview = $("#previewFilter").is(":checked");

	const filteredData = filterByGenresPriceRangeAndPreview(AllData, selectedGenres, selectedPriceRange, hasPreview);

	$("#cards").html(LoadCardData(filteredData));
});


// This funciton is used to get all the genres of a specific card. used with LoadCardData function.
function getGenres(data) {
	let html = "";
	for (let item of data) {
		html += `${item}, `;
	}
	html = html.slice(0, -2);
	return html;
}


// Loads the cards
const LoadCardData = (data) => {
	if (data.length == 0)
	return `
			<div style="display: flex; ; align-items: center; height: 100vh; flex-direction: column;">
					<h1 style="margin-top: 50px; text-align: center;">No results found</h1>
			</div>`;
  let html = "";
  for (let item of data) {
    html += `
    <div onclick="getId('${item._id}')" id="${item._id}" class="card col-sm-12 col-md-6 col-lg-3 mx-4">
      <img class="card-img-top" src="${item.album_image}" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">${item.title}</h5>
        <p class="card-text">${item.album}
				<br>${item.artist}
				<br>${getGenres(item.genre)}
				<br>${item.year}
				<br>${millisecondsToMMSS(item.duration)}
				<br>Price: $${item.price}
				</p>
				<div class="ms-auto w-auto text-end num-of-purchases-and-icon"><i class="fa-solid fa-bag-shopping"></i> ${item.numOfPurchases}</div>
      </div>
    </div>
    `;
  }
  return html;
};

//function for converting milliseconds to MM:SS format
function millisecondsToMMSS(milliseconds) {
	const totalSeconds = Math.floor(milliseconds / 1000);
	const minutes = Math.floor(totalSeconds / 60);
	const seconds = totalSeconds % 60;

	const formattedMinutes = String(minutes).padStart(2, '0');
	const formattedSeconds = String(seconds).padStart(2, '0');

	return `${formattedMinutes}:${formattedSeconds}`;
}

// Click on card to move to song page
const getId = (id) => {
  window.location.href = `./SongPage.html?songId=${id}`;
};


const generateGenreDropdownOptions = (data) => {
	const allGenres = data.flatMap((x) => x.genre);
	const uniqueGenres = [...new Set(allGenres.map(item => item.trim()))];

	let html = '';
	for (const item of uniqueGenres) {
			html += `
					<div class="form-check">
							<input class="form-check-input genre-checkbox" type="checkbox" value="${item}" id="genreCheckbox_${item.replace(' ', '_')}">
							<label class="form-check-label" for="genreCheckbox_${item.replace(' ', '_')}">
									${item}
							</label>
					</div>
			`;
	}

	return html;
};


const generatePricesDropdownOptions = () => {
	let html = '';
	let i = 0
	for (i; i <= 30; i += 10) {
			html += `
					<div class="form-check">
							<input class="form-check-input price-checkbox" type="checkbox" value="$${i}-$${i+10}" id="priceCheckBox_${i}">
							<label class="form-check-label" for="price-checkbox">
								$${i}-$${i+10}
							</label>
					</div>
			`;
	}
	html += `
	<div class="form-check">
			<input class="form-check-input price-checkbox" type="checkbox" value="$${i}+">
			<label class="form-check-label" for="genreCheckbox">
				$${i}+
			</label>
	</div>
`;
	return html;
};


// Function to filter data based on genres, price range, and has preview
function filterByGenresPriceRangeAndPreview(data, genres, priceRange, hasPreview) {

	const filteredByGenres = filterByGenres(data, genres);
	const filteredByGenresAndPrice = filterByPriceRange(filteredByGenres, priceRange);
	const filteredData = filteredByGenresAndPrice.filter(item => {
			return hasPreview ? item.preview_url !== "" && item.preview_url !== null : true;
	});



	return filteredData;
}

const filterByGenres = (data, selectedGenres) => {
  if (selectedGenres.length === 0) {
    return data; // If no genres selected, return all data
  }
  return data.filter(item => item.genre.some(genre => selectedGenres.includes(genre)));
};

const filterByPriceRange = (data, selectedPriceRange) => {
	console.log(selectedPriceRange);
	if (selectedPriceRange.length === 0) {
			return data; // If no price range selected, return all data
	}

	let filteredData = [];
	
	selectedPriceRange.forEach(item => {
			try {
					let min, max;
					if (item.includes('+')) {
							min = item.slice(1,3);
							max = Infinity;
					} else {
							const rangeValues = item.split(' - ');
							min = parseInt(rangeValues[0].trim().slice(1));
							max = parseInt(rangeValues[1].trim().slice(1));
					}
					data.forEach(item => {
							if (item.price >= min && item.price <= max) {
									filteredData.push(item);
							}
					});
			} catch (error) {
					console.error(error);
			}
	});
	
	return filteredData;
};


const carousel = (data) => {
	const carouselData = [...data];
  carouselData.sort((a, b) => b.numOfPurchases - a.numOfPurchases); 
  const top5 = carouselData.slice(0, 5); 
  let html = '';

  for (let index = 0; index < top5.length; index++) {
    const item = top5[index];
    const isActive = index === 0 ? 'active' : '';
    html += `
		<div class="carousel-item ${isActive} h-100">
		<img src="${item.album_image}" class="img-fluid w-100 h-100" alt="...">
		<div class="carousel-item-body">
			 <h5 class="carousel-item-title">${item.title}</h5>
			 <p class="carousel-item-text">${item.album}
			 <br>${item.artist}
			 <br>${getGenres(item.genre)}
			 <br>${item.year}
			 <br>Price: $${item.price}</p>
			 <button class="carousel-item-btn" onclick="getId('${item._id}')">
    			Buy Song
    			<i class="fa-solid fa-arrow-right" style="margin-left: 10px;"></i>
				</button>
		</div>
 </div>
    `;
  }

	return html;
};


function initSocket() {
	console.log("initSocket")
	const socket = io("http://localhost:7070", {
	  transports: ["websocket"],
	});
  
	socket.on("connect", function () {
	  console.log("Connected to socket.io server");
	  socket.emit("message", "Hello World from client");
	});
  
	socket.on("message", function (message) {
	  console.log("Received message:", message);
	});

	socket.on("updateSongNumOfPurchases", function (message) {
		console.log("Received message:", message);
		for(let i = 0; i < message.length; i++){
			$(`#${message[i].songId} .num-of-purchases-and-icon`).html(`<i class="fa-solid fa-bag-shopping"></i> ${message[i].numOfPurchases}`);
		}
	  });
}


