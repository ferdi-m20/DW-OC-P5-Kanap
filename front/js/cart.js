let productsInLocalStorage = JSON.parse(localStorage.getItem("cartItems"));
console.log(productsInLocalStorage);

async function displayCart() {
	const positionEmptyCart = document.getElementById("cart__items");

	if (productsInLocalStorage === null || productsInLocalStorage == 0) {
		let emptyCartParagraph = document.createElement("p");
		emptyCartParagraph.textContent = "Votre panier est vide";
		positionEmptyCart.appendChild(emptyCartParagraph);
	} else {
		for (product in productsInLocalStorage) {
			const items = await getProductDetails(productsInLocalStorage[product].id);
			// console.log(items);

			let productArticle = document.createElement("article");
			document.querySelector("#cart__items").appendChild(productArticle);
			productArticle.className = "cart__item";
			productArticle.setAttribute(
				"data-id",
				productsInLocalStorage[product].id
			);
			productArticle.setAttribute(
				"data-color",
				productsInLocalStorage[product].color
			);

			let productDivImg = document.createElement("div");
			productArticle.appendChild(productDivImg);
			productDivImg.className = "cart__item__img";

			let productImg = document.createElement("img");
			productImg.src = items.imageUrl;
			productImg.alt = items.altTxt;
			productDivImg.appendChild(productImg);

			let productItemContent = document.createElement("div");
			productItemContent.className = "cart__item__content";
			productArticle.appendChild(productItemContent);

			let productItemContentDescription = document.createElement("div");
			productItemContentDescription.className =
				"cart__item__content__description";
			productItemContent.appendChild(productItemContentDescription);

			let productTitle = document.createElement("h2");
			productTitle.textContent = items.name;
			productItemContentDescription.appendChild(productTitle);

			let productColor = document.createElement("p");
			productColor.textContent = productsInLocalStorage[product].color;
			productItemContentDescription.appendChild(productColor);

			const totalPriceItem =
				items.price * productsInLocalStorage[product].quantity;
			let productPrice = document.createElement("p");
			productPrice.textContent = totalPriceItem + " €";
			productItemContentDescription.appendChild(productPrice);

			let productItemContentSettings = document.createElement("div");
			productItemContentSettings.className = "cart__item__content__settings";
			productItemContent.appendChild(productItemContentSettings);

			let productItemContentSettingsQuantity = document.createElement("div");
			productItemContentSettingsQuantity.className =
				"cart__item__content__settings__quantity";
			productItemContentSettings.appendChild(
				productItemContentSettingsQuantity
			);

			let productQte = document.createElement("p");
			productItemContentSettingsQuantity.appendChild(productQte);
			productQte.textContent = "Qté : ";

			let productQuantity = document.createElement("input");
			productQuantity.className = "itemQuantity";
			productQuantity.setAttribute("type", "number");
			productQuantity.setAttribute("min", "1");
			productQuantity.setAttribute("max", "100");
			productQuantity.setAttribute("name", "itemQuantity");
			productQuantity.setAttribute(
				"value",
				productsInLocalStorage[product].quantity
			);
			productItemContentSettingsQuantity.appendChild(productQuantity);

			let productItemContentSettingsDelete = document.createElement("div");
			productItemContentSettingsDelete.className =
				"cart__item__content__settings__delete";

			productItemContentSettings.appendChild(productItemContentSettingsDelete);

			let productSupprimer = document.createElement("p");
			productSupprimer.className = "deleteItem";
			productSupprimer.textContent = "Supprimer";
			productItemContentSettingsDelete.appendChild(productSupprimer);
		}
		grandTotal();
	}
}

async function getProductDetails(productId) {
	try {
		const response = await fetch(
			"http://localhost:3000/api/products/" + productId
		);
		if (response.ok) {
			const data = await response.json();
			return data;
		} else {
			throw new Error("Failed to load API");
		}
	} catch (error) {
		console.log(error.message);
	}
}

displayCart();

async function grandTotal() {
	let productsInLocalStorage = JSON.parse(localStorage.getItem("cartItems"));
	let totalQuantity = 0;
	let totalPrice = 0;

	for (product in productsInLocalStorage) {
		const article = await getProductDetails(productsInLocalStorage[product].id);
		// console.log(article);
		totalQuantity += parseInt(productsInLocalStorage[product].quantity);
		totalPrice += parseInt(
			article.price * productsInLocalStorage[product].quantity
		);
	}
	document.getElementById("totalQuantity").textContent = totalQuantity;
	document.getElementById("totalPrice").textContent = totalPrice;
}
