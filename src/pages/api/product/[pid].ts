import fetchProducts from "../../../utils/fetchProducts";

export default async (req, res) => {
	const products = await fetchProducts();
	const {
		query: { pid },
	} = req;
	const product = products.find(x => x.sku == 0 + pid || x.sku == pid);

	res.status(200).json(product);
};
