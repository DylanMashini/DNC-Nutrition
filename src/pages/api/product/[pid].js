export default async (req, res) => {
	const products = await fetch(
		"https://dylanmashini.github.io/DNANutrition/prods.json"
	).then(res => res.json());
	const {
		query: { pid },
	} = req;
	const product = products.find(x => x.sku == 0 + pid || x.sku == pid);

	res.status(200).json(product);
};
