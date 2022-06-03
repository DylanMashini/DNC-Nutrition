import { MongoClient } from "mongodb";

export default async function ShipOrder(req, res) {
	if (req.method !== "GET") {
		res.status(405).end();
		return;
	}
	const { orderID } = req.query;
	if (!orderID) {
		res.status(400).send("No Order ID in URL");
		return;
	}
	const client = new MongoClient(process.env.MONGO_URI);
	try {
		await client.connect();
		const db = client.db("DNC");
		const collection = db.collection("orders");
		const order = await collection.findOne({ orderID: orderID });
		if (!order) {
			res.status(400).send("Order not found or already marked as paid");
			return;
		}
		await collection.deleteOne({ orderID: orderID });
		res.status(200).end();
		return;
	} finally {
		client.close();
	}
}
