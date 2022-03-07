export default function handler(req, res) {
	const products = require("../../prods.json");
	res.status(200).json(products);
}
