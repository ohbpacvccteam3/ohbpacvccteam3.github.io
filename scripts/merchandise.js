let merchandiseImages = ["images/black-hoodie-white-skull.png","images/white-hoodie-black-skull.png",
						"images/black-cap-white-skull.png","images/white-cap-black-skull.png",
						"images/black-bucket-white-skull.png","images/white-bucket-black-skull.png",
						"images/black-beanie-white-skull.png","images/white-beanie-black-skull.png",
						"images/black-tshirt.png","images/white-tshirt.png",
						"images/black-fanny-bag.png","images/white-fanny-bag.png"];
let merchandiseType = ["sweatshirt","sweatshirt",
								"hat","hat",
								"hat","hat",
								"hat","hat",
								"t-shirt","t-shirt",
								"bag","bag"];
let merchandiseDescription = ["black hoodie with a white skull","white hoodie with a black skull",
							"black cap with a white skull","white cap with a black skull",
							"black bucket hat with a white skull","white bucket hat with a black skull",
							"black beanie with a white skull","white beanie with a black skull",
							"black t-shirt with a white skull and band name","white t-shirt witha  black skull and band name",
							"black fanny pack with a white skull","white fanny pack with a black skull"];
let merchandisePrices = [25.49,25.49,
						14.99,14.99,
						24.99,24.99,
						24.99,24.99,
						14.99,14.99,
						0,0];
						
let shopSection = document.getElementById("shop");
let filters = document.getElementsByClassName("filter");
let cart = [""];

window.addEventListener("load", startup);

function startup() {
	for (let i=0; i<merchandiseImages.length; i++) {
		addItemToShop(createItem(merchandiseImages[i], merchandiseDescription[i], merchandisePrices[i], i));
	}
	for (let i=0; i<filters.length; i++) {
		filters[i].addEventListener("change", applyFilter);
	}
	let cartButtons = document.getElementsById("cart-button");
	for (let i=0; i<cartButtons.length; i++) {
		cartButtons[i].addEventListener("click", addItemToCart);
	}
}

function createItem(itemImage, itemDescription, itemPrice, itemID) {
	let item = "<div class='col-md-3 text-center element-top-margin'>";
	item += "<img src='" + itemImage + "' alt='" + itemDescription + "' class='w-100'>";
	item += "<div class='row justify-content-around'>";
	item += "<p class='col-sm-7 m-0 p-1'>$" + itemPrice + "</p>";
	item += "<div class='btn btn-danger background-red no-border text-white col-sm-4' id='cart-button' value='" + itemID + "'><i class='bi bi-cart2'></i></div>";
	item += "</div>";
	item += "</div>";
	return item;
}

function addItemToShop(item) {
	shopSection.insertAdjacentHTML("beforeEnd", item);
}

function applyFilter() {
	document.getElementById("shop").innerHTML = "";
	let checkedFilters = 0;
	for (let i=0; i<filters.length; i++) {
		if (filters[i].checked) {
			for (let j=0; j<merchandiseType.length; j++) {
				if (filters[i].value === merchandiseType[j]) {
					addItemToShop(createItem(merchandiseImages[j], merchandiseDescription[j], merchandisePrices[j], j));
				}
			}
			checkedFilters++;
		}
	}
	if (checkedFilters === 0) {
		for (let i=0; i<merchandiseImages.length; i++) {
			addItemToShop(createItem(merchandiseImages[i], merchandiseDescription[i], merchandisePrices[i], i));
		}
	}
}

function addItemToCart(value) {
	