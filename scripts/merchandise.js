/* Merch two-dimensional array; Format: itemID, Item Name, Image Link, Category (Filter), Image Description (Alt Text), Price */
let merchandise = [
					[0,"Black Hoodie","images/black-hoodie-white-skull.png","sweatshirt","Black hoodie with the band logo in white",25.49],
					[1,"White Hoodie","images/white-hoodie-black-skull.png","sweatshirt","White hoodie with the band logo in black",25.49],
					[2,"Black CD Hoodie","images/cd-cover-hoodie.png","sweatshirt","Black hoodie with the cd cover for Tears for Years",25.49],
					[3,"White Album Hoodie","images/album-cover-hoodie.png","sweatshirt","White hoodie with the album cover for Tears for Years", 25.49],
					[4,"Black Cap","images/black-cap-white-skull.png","hat","Black cap with the band logo in white",14.99],
					[5,"White Cap","images/white-cap-black-skull.png","hat","White cap with the band logo in black",14.99],
					[6,"Black Bucket Hat","images/black-bucket-white-skull.png","hat","Black bucket hat with the band logo in white",24.99],
					[7,"White Bucket Hat","images/white-bucket-black-skull.png","hat","White bucket hat with the band logo in black",24.99],
					[8,"Black Beanie","images/black-beanie-white-skull.png","hat","Black beanie with the band logo in white",24.99],
					[9,"Black T-Shirt","images/black-tshirt.png","t-shirt","Black t-shirt with the band logo and nane in white",14.99],
					[10,"White T-Shirt","images/white-tshirt.png","t-shirt","White t-shirt with the band logo and name in black",14.99],
					[11,"White Fanny Pack","images/white-fanny-bag.png","bag","White fanny pack with the band logo in black",16.99],
					[12,"White Drawstring Bag","images/white-sac-bag.png","bag","White drawstring bag with the band logo and name in black",16.99],
					[13,'"Tears for Years" CD',"images/cd.png","miscellaneous",'CD of the "Tears for Years" album',23.49],
					[14,'"Tears for Years" Vinyl',"images/vinyl.png","miscellaneous",'Vinyl of the "Tears for Years" album',27.49],
					[15,"Temporary Tattoos","images/tattoo.png","miscellaneous","Temporary tattoos of the band logo",4.99],
					[16,"Coasters","images/coasters.png","miscellaneous","Coasters with the band logo",9.99]
];

let shopSection = document.getElementById("shop");
let filters = document.getElementsByClassName("filter");
let cartButtons = document.getElementsByClassName("cart-button");
let cart = new Array();
const TAX_RATE = 0.08;
window.addEventListener("load", startup);
document.getElementById("see-cart").addEventListener("click", returnCart);
document.getElementById("clear").addEventListener("click", clearFilters);

function startup() {
	for (let i=0; i<merchandise.length; i++) {
		addItemToShop(createItem(merchandise[i][2], merchandise[i][4], merchandise[i][5], merchandise[i][1], merchandise[i][0]));
	}
	for (let i=0; i<filters.length; i++) {
		filters[i].addEventListener("change", applyFilter);
	}
	for (let i=0; i<cartButtons.length; i++) {
		createCartEventListeners(cartButtons[i], i);
	}
}

function createCartEventListeners(cartButton, itemID) {	
	cartButton.addEventListener("click", addItemToCart.bind(null, itemID));
}

function createItem(itemImage, itemDescription, itemPrice, itemName, itemID) {
	let item = "<div class='col-md-3 text-center element-top-margin'>";
	item += "<img src='" + itemImage + "' alt='" + itemDescription + "' class='w-100'>";
	item += "<div class='row justify-content-around'>";
	item += "<p class='col-sm-8 m-0 p-1 element-top-margin'>" + itemName +": $" + itemPrice + "</p>";
	item += "<div class='btn btn-danger background-red no-border text-white element-top-margin col-sm-3 cart-button' id='" + itemID + "'><i class='bi bi-cart2'></i></div>";
	item += "</div>";
	item += "</div>";
	return item;
}

function addItemToShop(item) {
	shopSection.insertAdjacentHTML("beforeEnd", item);
}

function applyFilter() {
	document.getElementById("see-cart").style.display = "block";
	shopSection.innerHTML = "";
	let checkedFilters = 0;
	let usedItemIDs = new Array();
	for (let i=0; i<filters.length; i++) {
		if (filters[i].checked) {
			for (let j=0; j<merchandise.length; j++) {
				if (filters[i].value === merchandise[j][3]) {
					addItemToShop(createItem(merchandise[j][2], merchandise[j][4], merchandise[j][5], merchandise[j][1], merchandise[j][0]));
					usedItemIDs.push(merchandise[j][0]);
				}
			}
			checkedFilters++;
		}
	}
	if (checkedFilters === 0) {
		for (let i=0; i<merchandise.length; i++) {
			addItemToShop(createItem(merchandise[i][2], merchandise[i][4], merchandise[i][5], merchandise[i][1], merchandise[i][0]));
			usedItemIDs.push(merchandise[i][0]);
		}
	}
	for (let i=0; i<usedItemIDs.length; i++) {
		createCartEventListeners(cartButtons[i], usedItemIDs[i]);
	}
	document.getElementById("checkout").style.display = "none";
}

function clearFilters() {
	for (let i=0; i<filters.length; i++) {
		filters[i].checked = false;
	}
	applyFilter();
}

function addItemToCart(itemID) {
	cart.push(Number(itemID));
	console.log(itemID);
}

function returnCart() {
	let subtotal = 0;
	shopSection.innerHTML = "";
	shopSection.insertAdjacentHTML("beforeEnd","<h2 class='text-center'>Your Cart</h2>");
	for (let i=0; i<cart.length; i++) {
		let item = "<div class='col-12 element-bottom-margin row justify-content-around'>";
		item += "<div class='col-3'>";
		item += "<img src='" + merchandise[cart[i]][2] + "' alt='" + merchandise[cart[i]][4] + "' class='w-100 cart-image'>";
		item += "</div>";
		item += "<div class='col-3 text-center'>";
		item += "<p class='text-white cart-text'>" + merchandise[cart[i]][1]+ "</p>";
		item += "</div>";
		item += "<div class='col-3 text-center'>";
		item += "<p class='text-white cart-text'>$" + merchandise[cart[i]][5] + "</p>";
		item += "</div>";
		item += "</div>";
		item += "<hr class='cart-hr'>"
		shopSection.insertAdjacentHTML("beforeEnd", item);
		subtotal += merchandise[cart[i]][5];
	}
	
	// Creates the text area for the subtotal
	let totalCostText = "<div class='col-12 row justify-content-around'>";
	totalCostText += "<div class='col-0'></div>";
	totalCostText += "<div class='col-2 text-end'>";
	totalCostText += "<p class='text-white cart-text'>Subtotal:</p>";
	totalCostText += "</div>";
	totalCostText += "<div class='col-1 text-start'>";
	totalCostText += "<p class='text-white cart-text'>" + formatCurrency(subtotal) + "</p>";
	totalCostText += "</div>";
	totalCostText += "</div>";
	
	// Creates the text area for the tax
	totalCostText += "<div class='col-12 row justify-content-around'>";
	totalCostText += "<div class='col-0'></div>";
	totalCostText += "<div class='col-2 text-end'>";
	totalCostText += "<p class='text-white cart-text'>Tax:</p>";
	totalCostText += "</div>";
	totalCostText += "<div class='col-1 text-start'>";
	totalCostText += "<p class='text-white cart-text'>" + formatCurrency(subtotal*TAX_RATE) + "</p>";
	totalCostText += "</div>";
	totalCostText += "</div>";
	
	// Creates the area for the total
	totalCostText += "<div class='col-12 row justify-content-around'>";
	totalCostText += "<div class='col-0'></div>";
	totalCostText += "<div class='col-2 text-end'>";
	totalCostText += "<p class='text-white cart-text'>Total:</p>";
	totalCostText += "</div>";
	totalCostText += "<div class='col-1 text-start'>";
	totalCostText += "<p class='text-white cart-text'>" + formatCurrency(subtotal*TAX_RATE+subtotal) + "</p>";
	totalCostText += "</div>";
	totalCostText += "</div>";
	
	// Displays the subtotal, tax, and total price information
	shopSection.insertAdjacentHTML("beforeEnd",totalCostText);
	
	// Shows the checkout button
	document.getElementById("checkout").style.display = "block";
	document.getElementById("see-cart").style.display = "none";
}

function formatCurrency(value) {
    return "$" + value.toFixed(2);
}