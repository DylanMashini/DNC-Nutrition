export default function handler() {
	const fetch = require("node-fetch");
	const fs = require("fs");
	const { default: next } = require("next");

	const options = {
		method: "GET",
		headers: {
			Authorization: "Bearer 5ff7477a-29f9-a092-9522-9478e036b9e8",
		},
	};
	const APICall = async offset => {
		return new Promise((resolve, reject) => {
			fetch(
				`https://api.clover.com/v3/merchants/DMF44Z2ZC6PTT/items?limit=1000&offset=${offset}`,
				options
			)
				.then(res => res.json())
				.then(res => {
					resolve(res.elements);
				})
				.catch(err => reject(err));
		});
	};
	const run = () => {
		var allProds = [];
		var run = true;
		var count = 0;
		loop();
		function loop() {
			console.log("here");

			APICall(1000 * count)
				.then(data => {
					allProds = allProds.concat(data);
					console.log(allProds.length);
					if (data.length >= 1000) {
						count++;
						loop();
					} else {
						const finalProds = [];
						const finalProdsNoImg = [];
						allProds.forEach((prod, index) => {
							//check if sku starts with 0, if so remove the 0
							if (prod.sku.charAt(0) === "0") {
								prod["images"] = [
									"/products/" +
										prod.sku.substring(1) +
										".jpeg",
								];
							} else {
								prod["images"] = [
									"/products/" + prod.sku + ".jpeg",
								];
							}

							prod["reviews"] = [];
							prod["currentPrice"] = prod.price / 100;
							//fix this
							if (fs.existsSync("public" + prod["images"][0])) {
								finalProds.push(prod);
							} else {
								finalProdsNoImg.push(prod);
							}
						});
						for (var i = 0; i < finalProdsNoImg.length; i++) {
							finalProds.push(finalProdsNoImg[i]);
						}

						fs.writeFile(
							"prods.json",
							JSON.stringify(finalProds),
							err => {
								if (err) {
									console.log(err);
								}
							}
						);
					}
				})
				.catch(err => {
					console.log(err);
				});
		}
	};
	run();
}
