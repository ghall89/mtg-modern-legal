const displayAreaEl = document.querySelector("#cardContainer");
const searchFieldEl = document.querySelector("#searchField");
const searchBtnEl = document.querySelector("#searchBtn");


const runSearch = query => {
	fetch("https://api.scryfall.com/cards/search?q=" + query)
	.then(function(response) {
		if (response.ok) {
			response.json()
				.then(function(data) {
					displayResult(data);
				})
		} else {
			alert("Error, could not connect to API");
		}
	});

};


const displayResult = data => {
	
	const isItLegal = document.createElement("p");
	
	const cardPic = document.createElement("img");
	cardPic.setAttribute("src", data.data[0].image_uris.normal);
	

		
	if (data.data[0].legalities.modern = "legal") {
		isItLegal.textContent = "It's legal for Modern!";
	} else if ((data.data[0].legalities.modern = "not_legal")) {
		isItLegal.textContent = "It's not legal for Modern!";
	} else {
		isItLegal.textContent = "No result."
	}
	
	displayAreaEl.appendChild(isItLegal);
	displayAreaEl.appendChild(cardPic);
};

searchBtnEl.addEventListener("click", function() {
	event.preventDefault();
	
	displayAreaEl.innerHTML = "";
	
	const query = searchFieldEl.value;
	
	if (!query) {
		const alertText = document.createElement("p");
		alertText.textContent = "Please enter the name of a card."
		
		displayAreaEl.appendChild(alertText);
		
		return;
	}
	
	runSearch(query);
})

