let merchandise = [
					["Black Hoodie","images/black-hoodie-white-skull.png","sweatshirt","black hoodie with a white skull",25.49],
					["White Hoodie","images/white-hoodie-black-skull.png","sweatshirt","white hoodie with a black skull",25.49],
					["Black Cap","images/black-cap-white-skull.png","hat","black cap with a white skull",4.99,],
					["White Cap","images/white-cap-black-skull.png","hat","white cap with a black skull",14.99],
					["Black Bucket Hat","images/black-bucket-white-skull.png","hat","black bucket hat with a white skull",24.99],
					["White Bucket Hat","images/white-bucket-black-skull.png","hat","white bucket hat with a black skull",24.99],
					["Black Beanie","images/black-beanie-white-skull.png","hat","black beanie with a white skull",24.99],
					["White Beanie","images/white-beanie-black-skull.png","hat","white beanie with a black skull",24.99],
					["Black T-Shirt","images/black-tshirt.png","t-shirt","black t-shirt with a white skull and band name",14.99],
					["White T-Shirt","images/white-tshirt.png","t-shirt","white t-shirt with a black skull and band name",14.99],
					["Black Fanny Pack","images/black-fanny-bag.png","bag","black fanny pack with a white skull",0,],
					["White Fanny Pack","images/white-fanny-bag.png","bag","white fanny pack with a black skull",0]
];

let shopSection = document.getElementById("shop");
let filters = document.getElementsByClassName("filter");
let cartButtons = document.getElementsByClassName("cart-button");
let cart = new Array();

window.addEventListener("load", startup);
document.getElementById("see-cart").addEventListener("click", returnCart);

function startup() {
	for (let i=0; i<merchandise.length; i++) {
		addItemToShop(createItem(merchandise[i][1], merchandise[i][3], merchandise[i][4], merchandise[i][0], i));
	}
	for (let i=0; i<filters.length; i++) {
		filters[i].addEventListener("change", applyFilter);
	}
	for (let i=0; i<cartButtons.length; i++) {	
		cartButtons[i].addEventListener("click", addItemToCart.bind(null, i));
	}
}

function createItem(itemImage, itemDescription, itemPrice, itemName, itemID) {
	let item = "<div class='col-md-3 text-center element-top-margin'>";
	item += "<img src='" + itemImage + "' alt='" + itemDescription + "' class='w-100'>";
	item += "<div class='row justify-content-around'>";
	item += "<p class='col-sm-8 m-0 p-1'>" + itemName +": $" + itemPrice + "</p>";
	item += "<div class='btn btn-danger background-red no-border text-white col-sm-3 cart-button' id='" + itemID + "'><i class='bi bi-cart2'></i></div>";
	item += "</div>";
	item += "</div>";
	return item;
}

function addItemToShop(item) {
	shopSection.insertAdjacentHTML("beforeEnd", item);
}

function applyFilter() {
	shopSection.innerHTML = "";
	let checkedFilters = 0;
	for (let i=0; i<filters.length; i++) {
		if (filters[i].checked) {
			for (let j=0; j<merchandise.length; j++) {
				if (filters[i].value === merchandise[j][2]) {
					addItemToShop(createItem(merchandise[j][1], merchandise[j][3], merchandise[j][4], merchandise[j][0], j));
				}
			}
			checkedFilters++;
		}
	}
	if (checkedFilters === 0) {
		for (let i=0; i<merchandise.length; i++) {
			addItemToShop(createItem(merchandise[i][1], merchandise[i][3], merchandise[i][4], merchandise[i][0], i));
		}
	}
}

function addItemToCart(itemID) {
	cart.push(Number(itemID));
	console.log(itemID);
}

function returnCart() {
	shopSection.innerHTML = "";
	shopSection.insertAdjacentHTML("beforeEnd","<h2 class='text-center'>Your Cart</h2>");
	for (let i=0; i<cart.length; i++) {
		let item = "<div class='col-md-12 text-center element-top-margin'>";
		item += "<img src='" + merchandise[cart[i]][1] + "' alt='" + merchandise[cart[i]][3] + "' class='w-100'>";
		item += "<p class='text-white'>" + merchandise[cart[i]][0]+ "<br>$" + merchandise[cart[i]][4] + "</p>";
		shopSection.insertAdjacentHTML("beforeEnd", item);
	}
}