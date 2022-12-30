export default async function handler(req, res) {
	const products = await fetch(process.env.PRODUCTS_URL).then(res =>
		res.json()
	);
	res.status(200).json(products);
}
