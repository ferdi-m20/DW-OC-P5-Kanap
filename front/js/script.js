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
