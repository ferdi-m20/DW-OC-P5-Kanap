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
