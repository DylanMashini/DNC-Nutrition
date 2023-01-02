import fetchProducts from "./fetchProducts";

export default async function (id: string) {
	const products = await fetchProducts();
	const product = products.find(x => x.sku == 0 + id || x.sku == id);
	return product;
}
