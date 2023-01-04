import fs from "fs";

export default function handler(req, res) {
	if (process.env.NEXT_PUBLIC_TEST_ENV) {
		let prods = fs.readFileSync("src/utils/testProducts.json").toString();
		res.status(200).send(prods);
	} else {
		res.status(404).end();
	}
}
