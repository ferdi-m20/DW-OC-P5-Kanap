const apiURL = "http://localhost:3000/api/products";

async function fetchData() {
	try {
		const response = await fetch(apiURL);
		if (response.ok) {
			const data = await response.json();
			return displayProducts(data);
		} else {
			throw new Error("Échec du chargement de l'API");
		}
	} catch (error) {
		console.log(error.message);
	}
}

function displayProducts(items) {
	for (let item of items) {
		// console.log(item);
		let productLink = document.createElement("a");
		productLink.setAttribute("href", `product.html?id=${item._id}`);
		document.querySelector("#items").appendChild(productLink);

		let productArticle = document.createElement("article");
		productLink.appendChild(productArticle);

		let productImg = document.createElement("img");
		productImg.setAttribute("src", item.imageUrl);
		productImg.setAttribute("alt", item.altTxt);
		productArticle.appendChild(productImg);

		let productTitle = document.createElement("h3");
		productTitle.classList.add("productName");
		productTitle.textContent = item.name;
		productArticle.appendChild(productTitle);

		let productDescription = document.createElement("p");
		productDescription.classList.add("productDescription");
		productDescription.textContent = item.description;
		productArticle.appendChild(productDescription);
	}
}

fetchData();
