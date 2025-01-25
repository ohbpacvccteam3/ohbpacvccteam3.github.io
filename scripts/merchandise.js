// Merch two-dimensional array; Format: itemID, Item Name, Image Link, Category (Filter), Image Description (Alt Text), Price
let merchandise = [
					[0,"Black Hoodie","images/black-hoodie-white-skull.png","sweatshirt","Black hoodie with the band logo in white",34.99],
					[1,"White Hoodie","images/white-hoodie-black-skull.png","sweatshirt","White hoodie with the band logo in black",34.99],
					[2,"Black CD Hoodie","images/cd-cover-hoodie.png","sweatshirt","Black hoodie with the cd cover for Tears for Years",34.99],
					[3,"White Album Hoodie","images/album-cover-hoodie.png","sweatshirt","White hoodie with the album cover for Tears for Years", 34.99],
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

// Variable declarations
let shopSection = document.getElementById("shop");
let filters = document.getElementsByClassName("filter");
let cartButtons = document.getElementsByClassName("cart-button");
let cart = new Array();
const TAX_RATE = 0.08;

// Runs code upon page load
window.addEventListener("load", startup);

// Code that runs upon page load
function startup() {
	// Loads all shop items
	for (let i=0; i<merchandise.length; i++) {
		addItemToShop(createItem(merchandise[i][2], merchandise[i][4], merchandise[i][5], merchandise[i][1], merchandise[i][0]));
	}
	
	// Creates the cart button
	createCartButton();

	//Provides funcitonality to filters
	for (let i=0; i<filters.length; i++) {
		filters[i].addEventListener("change", applyFilter);
	}
	document.getElementById("clear").addEventListener("click", clearFilters);

	// Provides funcitonality to the cart button on each item
	for (let i=0; i<cartButtons.length; i++) {
		createCartEventListeners(cartButtons[i], i);
	}
}

// Creates the cart button and provides functionality
function createCartButton() {
	document.getElementById("cart-shop-button").innerHTML = "<button class='btn btn-danger w-100 h-100 background-red no-border' type='button' id='see-cart'>Your Cart</button>";
	document.getElementById("see-cart").addEventListener("click", returnCart);
}

// Provides functionality to cart buttons on every item
function createCartEventListeners(cartButton, itemID) {	
	cartButton.addEventListener("click", addItemToCart.bind(null, itemID));
}

// Creates an item for the shop
function createItem(itemImage, itemDescription, itemPrice, itemName, itemID) {
	let item = "<div class='col-md-3 text-center element-top-margin'>";
	item += "<img src='" + itemImage + "' alt='" + itemDescription + "' class='w-100'>";
	item += "<div class='row justify-content-around'>";
	item += "<p class='col-sm-8 m-0 p-1 element-top-margin shop-text vertical-center'>" + itemName +": $" + itemPrice + "</p>";
	item += "<button class='btn btn-danger background-red no-border text-white element-top-margin col-sm-3 cart-button vertical-center' id='" + itemID + "'><i class='bi bi-cart2'></i></button>";
	item += "</div>";
	item += "</div>";
	return item;
}

// Adds an item to the shop
function addItemToShop(item) {
	shopSection.insertAdjacentHTML("beforeEnd", item);
}

// Applies content filters to shop items
function applyFilter() {
	createCartButton();
	shopSection.innerHTML = "";
	let checkedFilters = 0;
	let usedItemIDs = new Array();

	// Applies filters to shop items
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

	// Loads full page if no filters are applied
	if (checkedFilters === 0) {
		for (let i=0; i<merchandise.length; i++) {
			addItemToShop(createItem(merchandise[i][2], merchandise[i][4], merchandise[i][5], merchandise[i][1], merchandise[i][0]));
			usedItemIDs.push(merchandise[i][0]);
		}
	}

	// Provides functionality for each cart button
	for (let i=0; i<usedItemIDs.length; i++) {
		createCartEventListeners(cartButtons[i], usedItemIDs[i]);
	}

	// Hides the checkout button
	document.getElementById("checkout").style.display = "none";
}

// Clears all applied filters
function clearFilters() {
	for (let i=0; i<filters.length; i++) {
		filters[i].checked = false;
	}
	applyFilter();
}

// Adds an item to the cart
function addItemToCart(itemID) {
	cart.push(Number(itemID));
}

// Creates and formats the cart when the button is pressed
function returnCart() {
	let subtotal = 0;
	shopSection.innerHTML = "";
	shopSection.insertAdjacentHTML("beforeEnd","<h2 class='text-center element-bottom-margin'>Your Cart</h2>");
	
	// Creates return to shop button and provides functionality
	document.getElementById("cart-shop-button").innerHTML = "<button class='btn btn-danger w-100 h-100 background-red no-border' type='button' id='see-shop'>Shop</button>";
	document.getElementById("see-shop").addEventListener("click",applyFilter);
	
	// Creates each cart item
	for (let i=0; i<cart.length; i++) {
		let item = "<div class='col-12 element-bottom-margin row justify-content-around'>";
		item += "<div class='col-3'>";
		item += "<img src='" + merchandise[cart[i]][2] + "' alt='" + merchandise[cart[i]][4] + "' class='w-100 cart-image'>";
		item += "</div>";
		item += "<div class='col-3 text-center'>";
		item += "<p class='text-white shop-text'>" + merchandise[cart[i]][1]+ "</p>";
		item += "</div>";
		item += "<div class='col-3 text-center'>";
		item += "<p class='text-white shop-text'>$" + merchandise[cart[i]][5] + "</p>";
		item += "<button class='btn btn-danger w-100 background-red no-border remove-item' type='button' id='" + merchandise[cart[i]][0] +"'><i class='bi bi-trash'></i></button>";
		item += "</div>";
		item += "</div>";
		item += "<hr class='cart-hr'>"
		shopSection.insertAdjacentHTML("beforeEnd", item);
		subtotal += merchandise[cart[i]][5];
	}
	
	// Provides functionality for remove item buttons
	let removeItemButtons = document.getElementsByClassName("remove-item");
	for (let i=0; i<removeItemButtons.length; i++) {
		removeItemButtons[i].addEventListener("click",removeItemFromCart.bind(null,removeItemButtons[i].id));
	}
	
	// Creates the text area for the subtotal
	let totalCostText = "<div class='col-12 row justify-content-around'>";
	totalCostText += "<div class='col-2 text-end'>";
	totalCostText += "<p class='text-white cart-text'>Subtotal:</p>";
	totalCostText += "</div>";
	totalCostText += "<div class='col-2 text-start'>";
	totalCostText += "<p class='text-white cart-text'>" + formatCurrency(subtotal) + "</p>";
	totalCostText += "</div>";
	totalCostText += "</div>";
	
	// Creates the text area for the tax
	totalCostText += "<div class='col-12 row justify-content-around'>";
	totalCostText += "<div class='col-2 text-end'>";
	totalCostText += "<p class='text-white cart-text'>Tax:</p>";
	totalCostText += "</div>";
	totalCostText += "<div class='col-2 text-start'>";
	totalCostText += "<p class='text-white cart-text'>" + formatCurrency(subtotal*TAX_RATE) + "</p>";
	totalCostText += "</div>";
	totalCostText += "</div>";
	
	// Creates the area for the total
	totalCostText += "<div class='col-12 row justify-content-around'>";
	totalCostText += "<div class='col-2 text-end'>";
	totalCostText += "<p class='text-white cart-text'>Total:</p>";
	totalCostText += "</div>";
	totalCostText += "<div class='col-2 text-start'>";
	totalCostText += "<p class='text-white cart-text'>" + formatCurrency(subtotal*TAX_RATE+subtotal) + "</p>";
	totalCostText += "</div>";
	totalCostText += "</div>";
	
	// Displays the subtotal, tax, and total price information
	shopSection.insertAdjacentHTML("beforeEnd",totalCostText);
	
	// Shows the checkout button
	document.getElementById("checkout").style.display = "block";
}

// Removes an item from the cart
function removeItemFromCart(itemID){
	cart.splice(cart.indexOf(Number(itemID)),1);
	returnCart();
}

// Formats currency to two decimal points
function formatCurrency(value) {
    return "$" + value.toFixed(2);
}