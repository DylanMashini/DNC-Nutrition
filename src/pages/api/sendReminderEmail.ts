import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import sgMail from "@sendgrid/mail";
// called by cron job daily at 10am
export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);
	// get all orders that have status paid
	const client = new MongoClient(process.env.MONGO_URI);
	try {
		await client.connect();
		const db = client.db(process.env.MONGO_DATABASE);
		const collection = db.collection("orders");
		const orders = await collection.find({ status: "paid" }).toArray();
		for (let order of orders) {
			const { orderID, email } = order;
			// send email
			const msg = {
				to:
					process.env.EMPLOYEE_EMAIL ||
					"discountnutritionga@gmail.com",
				from: "ecommerce@dylanmashini.com",
				subject: `Ecommerce Order ID:${orderID}`,
				text: "Ecommerce Order",
				html: email,
			};
			await sgMail.send(msg);
		}
		res.status(200).end();
	} finally {
		client.close();
	}
}
