import type { NextApiRequest, NextApiResponse } from 'next'
const prods = require("../../prods.json")
import {server} from '../../utils/server'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	return new Promise((resolve, reject) => {
		let id;
		if (req.method !== "POST") {
			res.status(405).send({ message: "Only POST requests allowed" });
			return;
		}
		var finalJSON = req.body;
		var hcJSON = req.body;
		hcJSON["shoppingCart"] = hcJSON["orderCart"];
		hcJSON["orderCart"] = null;
		console.log(finalJSON);
		var lineItems = finalJSON.orderCart["lineItems"];
		for (var i = 0; i < lineItems.length; i++) {
			const name = lineItems[i]["name"];
			const product = prods.find(x => x.name == name);
			if (product != null) {
				lineItems[i]["id"] = product.id;
			}
		}
		finalJSON["orderCart"]["lineItems"] = lineItems;
		
		fetch(`${process.env.CLOVER_URL}/v3/merchants/${process.env.CLOVER_MERCHANT_ID}/orders`, {
			method: "POST",
			headers: {
				Authorization: `Bearer ${process.env.CLOVER_TOKEN}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(finalJSON),
		})
			.then(result => result.json())
			.then(result => {
				//response from clover looks like: {"href":"https://www.clover.com/checkout/3d5d5072-66cc-459a-b3a5-f668abdd5abb?mode=checkout","checkoutSessionId":"3d5d5072-66cc-459a-b3a5-f668abdd5abb","expirationTime":"2022-03-03@02:02:42.839+0000","createdTime":"2022-03-03@01:47:42.841+0000"}
				console.log(result);
				id = result.id;
				fetch(`${process.env.CLOVER_URL}/invoicingcheckoutservice/v1/checkouts`, {
			method: "POST",
			headers: {
				Authorization: "Bearer adeea858-25fc-7cb4-f3ff-5c176e2404ec",
				"X-Clover-Merchant-Id": "DMF44Z2ZC6PTT",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(hcJSON),
		})
			.then(result => result.json())
			.then(result => {
				//response from clover looks like: {"href":"https://www.clover.com/checkout/3d5d5072-66cc-459a-b3a5-f668abdd5abb?mode=checkout","checkoutSessionId":"3d5d5072-66cc-459a-b3a5-f668abdd5abb","expirationTime":"2022-03-03@02:02:42.839+0000","createdTime":"2022-03-03@01:47:42.841+0000"}
				const url = result.href;
				if (url != null) {
					res.status(200).json({ url: url });
				} else {
					res.status(400).json({
						error: "url is nullll",
						result: result,
					});
				}
					resolve("");
			})
			.catch(err => {
				console.log(err);
				res.status(400).json({ error: err });
					resolve("");
			});
			})
			.catch(err => {
				console.log(err);
				res.status(400).json({ error: err });
				resolve("");
			});
	});
}
