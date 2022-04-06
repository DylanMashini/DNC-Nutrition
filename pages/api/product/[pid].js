import products from "../../../prods.json";

export default (req, res) => {
	const {
		query: { pid },
	} = req;
	const product = products.find(x => x.sku == 0 + pid || x.sku == pid);

	res.status(200).json(product);
};
