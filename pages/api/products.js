// fake data
const products = require("../../prods.json");
export default (req, res) => {
	// fake loading time
	res.status(200).json(products);
};
