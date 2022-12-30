import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import bcrypt from "bcryptjs";
import crypto from "crypto";
export default async (req: NextApiRequest, res: NextApiResponse) => {
	const request = req.body;
	const email = request.email;
	const password = request.password;
	const uri = process.env.MONGO_URI;
	const client = new MongoClient(uri);

	try {
		//connect to database
		await client.connect();
		//get database
		const db = client.db(process.env.MONGO_DATABASE);
		//get collection
		const collection = db.collection("users");
		//search for user
		const user = await collection.findOne({ email: email.toLowerCase });
		//make sure user exists
		if (user) {
			//validate password
			const valid = await bcrypt.compare(password, user.password);
			if (valid) {
				//password is valid
				//create session
				const sessionID = crypto.randomUUID();
				await collection.updateOne(
					{ email: email.toLowerCase() },
					{ $set: { session: sessionID } }
				);
				res.status(200).json({
					message: "success",
					auth: true,
					session: sessionID,
				});
			} else {
				//password is invalid
				res.status(401).json({
					message: "invalid password",
				});
			}
		} else {
			//user does not exist
			res.status(400).json({
				message: "user not found",
			});
		}
	} finally {
		//end the session
		client.close();
	}
};
