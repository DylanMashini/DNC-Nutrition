import products from "../../prods.json";

export default (req, res) => {
	const body = req.body
    const pid = body.name
	console.log(pid);
	const product = products.find(x => x.name == pid);
    console.log("product: "+ product)
	res.status(200).json(product);
};
