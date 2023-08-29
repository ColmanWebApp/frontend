let AllData =  [];
let userOwnedSongs = [];

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
			init();
		},
		error: function (err) {
		}
	});
	initSocket();
});

// Event listener to filter selected genres, price range, and has preview
$(document).on("change", "#genreDropdownMenu .genre-checkbox, #priceDropdownMenu .price-checkbox, #previewDropdownMenu .preview-checkbox, #ownershipDropdownMenu .ownership-checkbox", function() {
	const selectedGenres = $("#genreDropdownMenu .genre-checkbox:checked").map(function() {
			return $(this).val();
	}).get();

	const selectedPriceRange = $("#priceDropdownMenu .price-checkbox:checked").map(function() {
			return $(this).val();
	}).get();

	const selectedPreviewOptions = $("#previewDropdownMenu .preview-checkbox:checked").map(function() {
		return $(this).val();
	}).get();

	const selectedOwnershipOptions = $("#ownershipDropdownMenu .ownership-checkbox:checked").map(function() {
		return $(this).val();
	}).get();

	const filteredData = filterByGenresPriceRangeAndPreview(AllData, selectedGenres, selectedPriceRange, selectedPreviewOptions, selectedOwnershipOptions);

	$("#cards").html(LoadCardData(filteredData));
});


function init() {
	$("#cards").html(LoadCardData(AllData));
	$("#bigCarousel").html(carousel(AllData));
	$("#genreDropdownMenu").html(generateGenreDropdownOptions(AllData));
	$("#priceDropdownMenu").html(generatePricesDropdownOptions);
	$("#previewDropdownMenu").html(generatePreviewDropdownOptions);


	// if a user is logged in, add the ownership status filter, and save the user's owned songs.
	const userToken = localStorage.getItem("user");
	if (userToken) {
		$("#ownershipFilter").html(generateOwnershipStatusDropdownOptions);
		$.ajax({
			url: "http://localhost:6969/users/user-details",
			type: "POST",
			secure: true,
			cors: true,
			headers: {
				 "Access-Control-Allow-Origin": "*",
			},
			data: {
				 token: userToken,
			},
			success: function(response) {
				const songIds = [];
				response.orders.forEach(order => {
						order.songs.forEach(song => {
								userOwnedSongs.push(song._id);
						});
				});
			}
		});
	}
	else {
		var filterElements = document.querySelectorAll('.dropdown');
		filterElements.forEach(function(element) {
			element.classList.remove('col-md-3');
			element.classList.add('col-md-4');
	});
	}
}

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
					<h1 style="margin-top: 150px; text-align: center;">No results found</h1>
			</div>`;
  let html = "";
  for (let item of data) {
    html += `
    <div onclick="getId('${item._id}')" id="${item._id}" class="card col-sm-12 col-md-6 col-lg-3 mx-4 rounded-3">
      <img class="card-img-top" src="${item.album_image}" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title p-0 px-1">${item.title}</h5>
				<div class="row px-3">
					<p class="card-text col-12 m-0 p-0">${item.album}</p>
					<p class="card-text col-12 m-0 p-0">${item.artist}</p>
					<p class="card-text col-12 m-0 p-0">${getGenres(item.genre)}</p>
					<p class="card-text col-12 m-0 p-0">${item.year}</p>
					<p class="card-text col-12 m-0 p-0">${millisecondsToMMSS(item.duration)}</p>
					<p class="card-text col-6 m-0 p-0">Price: $${item.price.toFixed(2)}</p>
				<div class="ms-auto w-auto text-end num-of-purchases-and-icon col-6 text-end"><i class="fa-solid fa-bag-shopping"></i> ${item.numOfPurchases}</div>
				</div>
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
							<label class="form-check-label" for="priceCheckbox">
								$${i}-$${i+10}
							</label>
					</div>
			`;
	}
	html += `
	<div class="form-check">
			<input class="form-check-input price-checkbox" type="checkbox" value="$${i}+">
			<label class="form-check-label" for="priceCheckbox">
				$${i}+
			</label>
	</div>
`;
	return html;
};


const generatePreviewDropdownOptions = () => {
	let html = '';
	html += `
	<div class="form-check">
			<input class="form-check-input preview-checkbox" type="checkbox" value="preview" id="exists_preview">
			<label class="form-check-label" for="previewCheckbox">
				Preview
			</label>
	</div>
`;
html += `
	<div class="form-check">
			<input class="form-check-input preview-checkbox" type="checkbox" value="no preview" id="not_exists_preview">
			<label class="form-check-label" for="previewCheckbox">
				No Preview
			</label>
	</div>
	`;
	return html;
}


const generateOwnershipStatusDropdownOptions = () => {
	let html = '';
		html += `
		<button class="btn btn-secondary dropdown-toggle w-100" type="button" id="ownershipDropdown" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
			<i class="fa-solid fa-filter"></i>
			Ownership Status
		</button>
		<div class="dropdown-menu px-2" aria-labelledby="ownershipDropdown" id="ownershipDropdownMenu">

		<div class="form-check">
			<input class="form-check-input ownership-checkbox" type="checkbox" value="owned" id="owned">
			<label class="form-check-label" for="owned">
					Owned
			</label>
		</div>

		<div class="form-check">
			<input class="form-check-input ownership-checkbox" type="checkbox" value="Unowned" id="Unowned">
			<label class="form-check-label" for="Unowned">
					Unowned
			</label>
		</div>
		</div>`;


	return html;
}


// Function to filter data based on genres, price range, and has preview
function filterByGenresPriceRangeAndPreview(data, genres, priceRange, previewSelections, selectedOwnershipOptions) {
	const filteredByGenres = filterByGenres(data, genres);
	const filteredByGenresAndPrice = filterByPriceRange(filteredByGenres, priceRange);
	const filteredByGenresAndPriceAndPreview = filterByPreview(filteredByGenresAndPrice, previewSelections)
	const filteredData = filterByOwnershipStatus(filteredByGenresAndPriceAndPreview, selectedOwnershipOptions);
	return filteredData;
}

const filterByGenres = (data, selectedGenres) => {
  if (selectedGenres.length === 0) {
    return data; // If no genres selected, return all data
  }
  return data.filter(item => item.genre.some(genre => selectedGenres.includes(genre)));
}

const filterByPriceRange = (data, selectedPriceRange) => {
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
							const rangeValues = item.split('-');
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
}

const filterByPreview = (data, selectedPreviewOptions) => {
	if (selectedPreviewOptions.length == 2 || selectedPreviewOptions.length == 0) {
		return data;
	}
	if (selectedPreviewOptions[0] == 'preview') 
		return data.filter(item => {
			return item.preview_url !== "" && item.preview_url !== null ? true : false;
	});
	else {
		return data.filter(item => {
			return item.preview_url !== "" && item.preview_url !== null ? false : true;
	});
	}
}

const filterByOwnershipStatus = (data, selectedOwnershipOptions) => {
	if (selectedOwnershipOptions.length == 2 || selectedOwnershipOptions.length == 0)
		return data;

	if (selectedOwnershipOptions[0] == 'owned')
		return data.filter(item => userOwnedSongs.includes(item._id));

	else
		return data.filter(item => !userOwnedSongs.includes(item._id));

}

const carousel = (data) => {
  const carouselData = [...data];
  carouselData.sort((a, b) => b.numOfPurchases - a.numOfPurchases);
  const top5 = carouselData.slice(0, 5);
  let html = '';

  for (let index = 0; index < top5.length; index++) {
    const item = top5[index];
    const isActive = index === 0 ? 'active' : '';
    html += `
      <a href="SongPage.html?songId=${item._id}" class="carousel-item ${isActive} h-100">
        <img src="${item.album_image}" class="img-fluid w-100 h-100" alt="...">
        <div class="carousel-item-body">
          <h5 class="carousel-item-title">${item.title}</h5>
          <p class="carousel-item-text">${item.album}
          <br>${item.artist}
          <br>${getGenres(item.genre)}
          <br>${item.year}
          <br>Price: $${item.price1}</p>
        </div>
      </a>
    `;
  }

  return html;
}

function initSocket() {
	const socket = io("http://localhost:7070", {
	  transports: ["websocket"],
	});
  
	socket.on("connect", function () {
	  console.log("Connected to socket.io server");
	  socket.emit("message", "Hello World from client");
	});
  
	socket.on("message", function (message) {
	});

	socket.on("updateSongNumOfPurchases", function (message) {
		for(let i = 0; i < message.length; i++){
			$(`#${message[i].songId} .num-of-purchases-and-icon`).html(`<i class="fa-solid fa-bag-shopping"></i> ${message[i].numOfPurchases}`);
		}
	  });
}


document.addEventListener("DOMContentLoaded", function() {
	// Get all the inner dropdown buttons
	var innerDropdownButtons = document.querySelectorAll(".dropdown-menu .dropdown-toggle");

	// Hide other inner dropdowns when an inner dropdown is clicked
	innerDropdownButtons.forEach(function(button) {
			button.addEventListener("click", function(event) {
					event.stopPropagation();
					// Close other inner dropdowns
					innerDropdownButtons.forEach(function(innerButton) {
							if (innerButton !== button) {
									var dropdownMenu = innerButton.nextElementSibling;
									if (dropdownMenu.classList.contains("show")) {
											dropdownMenu.classList.remove("show");
									}
							}
					});
			});
	});

	// Prevent dropdown menus from closing when clicking inside
	var dropdownMenus = document.querySelectorAll(".dropdown-menu");
	dropdownMenus.forEach(function(menu) {
			menu.addEventListener("click", function(event) {
					event.stopPropagation();
			});
	});
});


// Prevent propagation of click event from inner dropdown buttons to outer dropdown button
const innerDropdownButtons = document.querySelectorAll('.dropdown-menu button.dropdown-toggle');
innerDropdownButtons.forEach(button => {
	 button.addEventListener('click', (event) => {
			event.stopPropagation();
	 });
});

