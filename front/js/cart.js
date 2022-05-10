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
		deleteProduct();
		changeQuantity();
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

function deleteProduct() {
	const deleteButtons = document.querySelectorAll(".deleteItem");
	deleteButtons.forEach(function (deleteButton) {
		deleteButton.addEventListener("click", function (event) {
			event.preventDefault();
			let productsInLocalStorage = JSON.parse(
				localStorage.getItem("cartItems")
			);
			const deleteId = event.target.closest("article").dataset.id;
			// console.log(deleteId);
			const deleteColor = event.target.closest("article").dataset.color;

			// console.log(deleteColor);
			productsInLocalStorage = productsInLocalStorage.filter(function (
				element
			) {
				return !(element.id == deleteId && element.color == deleteColor);
			});
			console.log(productsInLocalStorage);
			deleteConfirm = window.confirm(
				"Etes vous sûr de vouloir supprimer cet article ?"
			);
			if (deleteConfirm == true) {
				localStorage.setItem(
					"cartItems",
					JSON.stringify(productsInLocalStorage)
				);
				alert("Article supprimé avec succès");

				deleteButton.closest("article").remove();
			}
			grandTotal();
		});
	});
}

function changeQuantity() {
	const quantityInputs = document.querySelectorAll(".itemQuantity");
	quantityInputs.forEach(function (quantityInput) {
		quantityInput.addEventListener("change", function (event) {
			event.preventDefault();
			let inputValue = Number(event.target.value);
			let productPrice = event.target
				.closest("article")
				.querySelector(".cart__item__content__description p:nth-child(3)");
			const dataId = event.target.closest("article").dataset.id;
			// console.log(dataId);
			const dataColor = event.target.closest("article").dataset.color;
			// console.log(dataColor);
			let cartItems = localStorage.getItem("cartItems");
			let items = JSON.parse(cartItems);

			items = items.map(function (item, index) {
				if (item.id === dataId && item.color === dataColor) {
					item.quantity = inputValue;
				}
				return item;
			});

			if (!Number.isInteger(inputValue)) {
				alert(
					"Veuillez renseigner un nombre entier compris entre 1 et 100\r\n"
				);
				return;
			} else if (inputValue == 0) {
				alert("Veuillez renseigner une quantité\r\n");
				return;
			} else if (inputValue > 100) {
				alert("La quantité maximale autorisée est de 100\r\n");
				return;
			} else if (inputValue < 0) {
				alert("Veuillez ne pas saisir de valeur négative!\r\n");
				return;
			}
			let itemsStr = JSON.stringify(items);
			localStorage.setItem("cartItems", itemsStr);
		});
	});
}
