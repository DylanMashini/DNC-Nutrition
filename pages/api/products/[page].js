export default async function Named(req, res) {
	return new Promise((resolve, reject) => {
		var  {
			query: { page },
		} = req;
		if (page == null) {
			page = 1;
		}
		const products = require("../../../prods.json");
		var list = [];
		for (var i = 0; i < products.length; i++) {
			if (i > page * 20) {
				break;
			}
			if (i >= (page - 1) * 20) {
				list.push(products[i]);
			}
		}
		res.status(200).json({ data: list });
		resolve(list);
	});
}
