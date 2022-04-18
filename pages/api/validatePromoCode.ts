import { extraColors } from "@nextui-org/react";
import codes from "../../promoCodes.json";
//returns ammount off of items, is checked again from createPaymentSession
export default function Handler(req, res) {
	if (req.method != "POST") {
		res.status(405).send("Wrong Method");
		return;
	}
	const code = req.body.code;
	const products = req.body.products;
	if (!code || !products) {
		res.status(400).send("Missing Paramerters");
		return;
	}
	const discount = codes.find(p => p.code == code);
	if (!discount) {
		res.status(400).send("Invalid Code");
		return;
	}
	let productTotal = 0;
	if (discount["validProducts"]) {
		//list of valid products
		for (const prod of products) {
			if (discount["validProducts"].includes(prod.id)) {
				productTotal += prod.price;
			}
		}
	} else if (discount["invalidProducts"]) {
		//list of invalid products
		for (const prod of products) {
			if (!discount["invalidProducts"].includes(prod.sku)) {
				//add price of product to total
				productTotal += prod.price;
			}
		}
	}
	if (discount.discountPercent) {
		//discount is a percent
		const discountAmount = productTotal * discount.discountPercent;
		res.status(200).send({ ammount: discountAmount });
	} else if (discount["discountAmmount"]) {
		if (productTotal > discount["discountAmmount"]) {
			res.status(200).json({ ammount: discount["discountAmmount"] });
		} else {
			res.status(400).send("Not enough products to apply discount");
		}
	}
}
