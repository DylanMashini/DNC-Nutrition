import { MongoClient } from "mongodb";
import Stripe from "stripe";

export default async function handler(req, res) {
	if (!process.env.TEST_ENV) {
		res.status(404).end();
	}
	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
		apiVersion: "2022-11-15",
	});

	const client = new MongoClient(process.env.MONGO_URI);
	try {
		await client.connect();
		const db = client.db(process.env.MONGO_DATABASE);
		const collection = db.collection("orders");
		// get most recently added document
		const orders = await collection.find({}).sort({ _id: -1 }).toArray();
		const order = orders[0];
		// verify status = paid
		if (order.status != "paid") {
			res.status(400).send("Status of order != paid").end();
			return;
		}
		const orderID = order.orderID;
		const stripeID = order.stripeID;
		// verify that stripe and clover have same cost
		const checkoutSession = await stripe.checkout.sessions.retrieve(
			stripeID
		);
		const stripeTotal = checkoutSession.amount_total;
		// get clover order
		const cloverTotal = (
			await (
				await fetch(
					`${process.env.CLOVER_URL_API}v3/merchants/${process.env.CLOVER_MERCHANT_ID}/orders/${orderID}`,
					{
						method: "GET",
						headers: {
							accept: "application/json",
							authorization: `Bearer ${process.env.CLOVER_TOKEN}`,
						},
					}
				)
			).json()
		).total;
		if (stripeTotal == cloverTotal) {
			res.status(200).end();
		} else {
			res.status(400).send("Stripe total different from clover total");
		}
	} finally {
		client.close();
	}
}
