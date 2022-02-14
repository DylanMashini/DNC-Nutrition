// fake data
import products from "../../../prods.json";

export default (req, res) => {
	const {
		query: { pid },
	} = req;
	console.log(pid);
	const product = products.find(x => x.sku == 0 + pid);
	console.log(product);

	res.status(200).json(product);
};
