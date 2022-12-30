import { MongoClient } from "mongodb";
export default async function verifyCookie(req, res) {
	const email = req.body.email;
	const id = req.body.session;
	const uri = process.env.MONGO_URI;
	const client = new MongoClient(uri);
	try {
		await client.connect();
		const db = client.db(process.env.MONGO_DATABASE);
		const collection = db.collection("users");
		const user = await collection.findOne({ email: email });
		if (user) {
			if (user.session == id) {
				res.status(200).json({ auth: true });
				return;
			} else {
				res.status(200).json({ auth: false });
				return;
			}
		} else {
			res.status(200).json({ auth: false });
			return;
		}
	} finally {
		client.close();
	}
}
