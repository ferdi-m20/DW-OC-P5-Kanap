let params = new URL(window.location.href).searchParams;
// console.log(params);
let productId = params.get("id");

async function getProduct() {
	try {
		const response = await fetch(
			"http://localhost:3000/api/products/" + productId
		);
		if (response.ok) {
			const data = await response.json();
			return displaySelectedProduct(data);
		} else {
			throw new Error("Failed to load API");
		}
	} catch (error) {
		console.log(error.message);
	}
}

function displaySelectedProduct(item) {
	// console.log(item);
	let productImg = document.createElement("img");
	productImg.setAttribute("src", item.imageUrl);
	productImg.setAttribute("alt", item.altTxt);
	document.querySelector(".item__img").appendChild(productImg);

	let productTitle = document.getElementById("title");
	productTitle.textContent = item.name;

	let productPrice = document.getElementById("price");
	productPrice.textContent = item.price;

	let productDescription = document.getElementById("description");
	productDescription.textContent = item.description;

	for (let color of item.colors) {
		// console.log(color);
		let productColors = document.createElement("option");
		productColors.setAttribute("value", color);
		productColors.textContent = color;
		document.querySelector("#colors").appendChild(productColors);
	}

	const addButton = document.getElementById("addToCart");
	addButton.addEventListener("click", checkCart);
}
