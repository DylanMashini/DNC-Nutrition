import type { NextApiRequest, NextApiResponse } from "next";
import fetchProducts from "../../utils/fetchProducts";
import { server } from "../../utils/server";
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method != "POST") {
		res.status(405).end();
		return;
	}

	const stripeProds = [];
	const cloverProds = [{ item: { id: process.env.CLOVER_SHIPPING } }];
	const metaItems = [];
	let email = "";
	let name = "";
	let id = undefined;
	if (req.cookies.userInfo) {
		const cookie = JSON.parse(req.cookies.userInfo);
		email = cookie.email;
		name = cookie.firstName + " " + cookie.lastName;
		id = cookie.stripeID;
	} else {
		email = "";
	}
	const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
	let cost = 0;
	const body = req.body;
	const prods = await fetchProducts();
	for (var i = 0; i < body.length; i++) {
		const id = body[i].id;
		const qty = body[i].count;
		//const response = json of product
		const response = prods.find(x => x.id == id);
		if (response.error) {
			res.status(400).json({ error: response.error });
			return;
		}

		const product = response;
		const price = product.price;
		const name = product.name;

		const priceID = await stripe.prices
			.create({
				unit_amount: Number(price),
				currency: "usd",
				product_data: { name: name },
			})
			.catch(err => console.error(err));
		//make sure item is in stock
		if (product.itemStock.stockCount < qty) {
			res.status(400).json({ error: "Not enough in stock" });
			console.log("not enough stock");
			return;
		}
		metaItems.push({
			name: product.name,
			price: price,
			qty: qty,
			sku: product.sku,
		});
		stripeProds.push({
			price: priceID.id,
			quantity: qty,
			tax_rates: [`${process.env.STRIPE_TAX_RATE}`],
		});
		for (let i = 0; i < qty; i++) {
			cloverProds.push({ item: { id: product.id } });
		}
		cost += price * qty;
	}
	const order = await (
		await fetch(
			`${process.env.CLOVER_URL_API}v3/merchants/${process.env.CLOVER_MERCHANT_ID}/atomic_order/orders`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${process.env.CLOVER_TOKEN}`,
				},
				body: JSON.stringify({ orderCart: { lineItems: cloverProds } }),
			}
		)
	).json();
	if (!order.id) {
		console.log(order);
		res.status(400).json({
			error: "No id proprety on clover order object",
		});
		return;
	}
	const cloverOrderID = order.id;

	try {
		// Create Checkout Sessions from body params.
		const sessionOptions = {
			line_items: stripeProds,
			mode: "payment",
			success_url: `${server}/payment/sucsess/`,
			cancel_url: `${server}/?canceled=true`,
			metadata: {
				cloverID: cloverOrderID,
				lineItems: JSON.stringify(metaItems),
			},
			shipping_address_collection: { allowed_countries: ["US"] },
			phone_number_collection: { enabled: true },
			shipping_options: [{ shipping_rate: process.env.STRIPE_SHIPPING }],
		};
		if (id) {
			sessionOptions["customer"] = id;
		}
		const session = await stripe.checkout.sessions.create(sessionOptions);
		res.status(200).json({ url: session.url });
	} catch (err) {
		console.error(err);
		res.status(err.statusCode || 500).json(err.message);
	}
}
