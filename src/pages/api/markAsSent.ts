import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import type { Order } from "../../utils/types/database";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	// mark order as sent to stop emails
	if (req.method != "POST") {
		res.status(405).end();
		return;
	}
	if (!req.body.orderID) {
		res.status(400).end();
		return;
	}
	let { orderID } = req.body;
	const client = new MongoClient(process.env.MONGO_URI);
	try {
		await client.connect();
		const db = client.db(process.env.MONGO_DATABASE);
		const collection = db.collection("orders");
		await collection.findOneAndUpdate(
			{ orderID },
			{ $set: { status: "sent" } }
		);
		res.status(200);
	} finally {
		client.close();
	}
}
