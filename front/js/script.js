// URL des API stocké dans une variable
const apiURL = "http://localhost:3000/api/products";

// Appel à l'API products
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

// Récupération des données et intégration dans le DOM
function displayProducts(items) {
	for (let item of items) {
		// console.log(item);

		// Insertion de l'élément "a"
		let productLink = document.createElement("a");
		productLink.setAttribute("href", `product.html?id=${item._id}`);
		document.querySelector("#items").appendChild(productLink);
		// Insertion de l'élément "article"
		let productArticle = document.createElement("article");
		productLink.appendChild(productArticle);
		// Insertion de l'image "img"
		let productImg = document.createElement("img");
		productImg.setAttribute("src", item.imageUrl);
		productImg.setAttribute("alt", item.altTxt);
		productArticle.appendChild(productImg);
		// Insertion du titre "h3"
		let productTitle = document.createElement("h3");
		productTitle.classList.add("productName");
		productTitle.textContent = item.name;
		productArticle.appendChild(productTitle);
		// Insertion de la description alt text "p"
		let productDescription = document.createElement("p");
		productDescription.classList.add("productDescription");
		productDescription.textContent = item.description;
		productArticle.appendChild(productDescription);
	}
}

fetchData();
