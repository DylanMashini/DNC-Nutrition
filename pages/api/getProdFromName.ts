export default async (req, res) => {
	const products = await fetch(
		"https://dylanmashini.github.io/DNANutrition/prods.json"
	).then(res => res.json());
	const body = req.body;
	const pid = body.name;
	console.log(pid);
	const product = products.find(x => x.name == pid);
	console.log("product: " + product);
	res.status(200).json(product);
};
