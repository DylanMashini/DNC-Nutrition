const fs = require("fs");
const getErrorFile = () => {
	return new Promise((resolve, reject) => {
		fs.readFile("./imgErrors.json", (err, data) => {
			if (err) reject(err);
			resolve(JSON.parse(data));
		});
	});
};
const getProds = () => {
	return new Promise((resolve, reject) => {
		fs.readFile("./prods.json", (err, data) => {
			if (err) reject(err);
			resolve(JSON.parse(data));
		});
	});
};

const main = async () => {
	const errors = await getErrorFile(err => console.log(err));
	const prods = await getProds().catch(err => console.log(err));
	const rows = [];
	rows.push(["sku", "name", "stockCount"]);
	for (var i = 0; i < errors.length; i++) {
		const sku = errors[i];
		const product = prods.find(x => x.sku == 0 + sku || x.sku == sku);
		if (!product) {
			console.log("sku not found: " + sku);
		} else {
			let array = [];
			array.push(product.sku);
			array.push(product.name);
			array.push(product.stockCount);
			rows.push(array);
		}
	}
	let csvContent = "data:text/csv;charset=utf-8,";
	rows.forEach(rowArray => {
		let row = rowArray.join(",");
		csvContent += row + "\r\n";
	});
	var encodedUri = encodeURI(csvContent);
	fs.writeFileSync("imgErrors.txt", encodedUri);
};

main().catch(err => console.log(err));
