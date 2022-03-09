const fetch = require("node-fetch");
const fs = require("fs");
const { default: next } = require("next");

const APICall = async (offset, apiKey, merchantID, url) => {
	const options = {
		method: "GET",
		headers: {
			Authorization: `Bearer ${apiKey}`,
		},
	};
	return new Promise((resolve, reject) => {
		fetch(
			`${url}/v3/merchants/${merchantID}/items?limit=1000&offset=${offset}`,
			options
		)
			.then(res => res.json())
			.then(res => {
				resolve(res.elements);
			})
			.catch(err => reject(err));
	});
};
const run = (apiKey, merchantID, url) => {
	var allProds = [];
	var run = true;
	var count = 0;
	loop();
	function loop() {
		console.log("here");

		APICall(1000 * count, apiKey, merchantID, url)
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
								"/products/" + prod.sku.substring(1) + ".jpeg",
							];
						} else {
							prod["images"] = [
								"/products/" + prod.sku + ".jpeg",
							];
						}

						prod["reviews"] = [];
						prod["currentPrice"] = prod.price / 100;
						if (prod.stockCount > 0) {
							if (fs.existsSync("public" + prod["images"][0])) {
								finalProds.push(prod);
							} else {
								finalProdsNoImg.push(prod);
							}
						}
					});
					for (var i = 0; i < finalProdsNoImg.length; i++) {
						finalProds.push(finalProdsNoImg[i]);
					}
					fetch("https://dna-nutrition.vercel.app/api/products")
						.then(res => res.json)
						.then(res => {
							if (res == finalProds) {
								console.log("No updates to inventory");
								return;
							}
						});
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
run(
	"f4e689f5-197b-3a25-9f99-0024da952d4f",
	"ZX3HTEDW8YD01",
	"https://sandbox.dev.clover.com"
);
//prod: 5ff7477a-29f9-a092-9522-9478e036b9e8
//prod: DMF44Z2ZC6PTT
