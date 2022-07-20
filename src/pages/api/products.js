export default async function handler(req, res) {
	const products = await fetch(
		"https://dylanmashini.github.io/DNANutrition/prods.json"
	).then(res => res.json());
	res.status(200).json(products);
}
