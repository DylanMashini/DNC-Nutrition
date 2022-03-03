const prods = require("../prods.json");
const fetch = require("node-fetch");
const fs = require("fs");
const request = require("request");
const { default: FsLightbox } = require("fslightbox-react");

var length = prods.length;
const getFileSku = sku => {
	if (sku.charAt(0) === "0") {
		return sku.substring(1);
	} else {
		return sku;
	}
};
const getErrorFile = async () => {
	return new Promise((resolve, reject) => {
		fs.readFile("./imgErrors.json", (err, data) => {
			if (err) reject(err);
			resolve(JSON.parse(data));
		});
	});
};
async function run() {
	const errors = await getErrorFile();
	var count = 0;
	//generates list of all products in stock
	console.log(errors);
	for (var i = 0; i < length; i++) {
		const product = prods[i];
		if (
			product.stockCount <= 0 ||
			product.sku == "" ||
			product.sku == null ||
			errors.includes(product.sku) ||
			fs.existsSync(
				"public/products/" + getFileSku(product.sku) + ".jpeg"
			) ||
			fs.existsSync(
				"public/products/new/" + getFileSku(product.sku) + ".jpeg"
			)
		) {
			prods.splice(i, 1);
			i--;
			length--;
		} else {
			count++;
			console.log(count);
		}
	}

	const DailyLimit = 100;
	var Count = 0;

	const lookUp = async () => {
		await sleep(5000);
		const product = prods[Count];

		const id = product.sku;
		console.log("looking up sku: " + id);

		const fileSku = getFileSku(product.sku);
		//check if image is in DNC imgs folder
		Count++;
		if (Count < DailyLimit) {
			const callback = () => {
				lookUp();
			};

			const url = `https://api.barcodespider.com/v1/lookup?token=17e3f1b458be5a665020&upc=${id}`;
			fetch(url)
				.then(res => res.json())
				.then(res => {
					//check if request was successful
					if (res["item_response"]["code"] != 200) {
						//request was not successful
						console.log(res);
						if (res["item_response"]["code"] != 429) {
							errors.push(id);
						} else {
							fs.writeFile(
								"imgErrors.json",
								JSON.stringify(errors),
								err => {
									if (err) throw err;
								}
							);
							return;
						}

						lookUp();
					} else {
						//save image
						console.log(res);
						const Imageurl = res["item_attributes"]["image"];

						downloadImageFromUrl(
							Imageurl,
							"public/products/new/" + fileSku + ".jpeg",
							callback
						);
					}
				})
				.catch(err => {
					console.log(err);
				});
		} else {
			fs.writeFile("imgErrors.json", JSON.stringify(errors), err => {
				if (err) throw err;
			});
		}
		return;
	};

	const downloadImageFromUrl = (url, path, callback) => {
		request.head(url, function (err, res, body) {
			request(url).pipe(fs.createWriteStream(path)).on("close", callback);
		});
	};
	function sleep(ms) {
		return new Promise(resolve => {
			setTimeout(resolve, ms);
		});
	}

	lookUp();
}
run();
