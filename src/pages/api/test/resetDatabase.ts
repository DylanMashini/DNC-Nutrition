// FOR TEST CASES ONLY
import { MongoClient } from "mongodb";
export default async function handler(req, res) {
	console.log("RESETTING DATABSE");
	if (!process.env.TEST_ENV) {
		res.status(404).end();
	}
	const dbName = process.env.MONGO_DATABASE;
	if (dbName !== "DNC-Test") {
		res.status(400).send("Attempted to reset production database");
		return;
	}
	const client = new MongoClient(process.env.MONGO_URI);
	try {
		await client.connect();
		const db = client.db(dbName);
		db.collection("orders").deleteMany({});
		db.collection("products").deleteMany({});
		db.collection("users").deleteMany({});
	} finally {
	}
	res.status(200).end();
}
