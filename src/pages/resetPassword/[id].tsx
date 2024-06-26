import { MongoClient } from "mongodb";
export default function ResetPassword(email) {
	return (
		<div>
			<h1>{email}</h1>
		</div>
	);
}
export async function getServerSideProps(ctx) {
	//change user password
	const client = await new MongoClient(process.env.MONGO_URL);
	try {
		await client.connect();
		const db = client.db(process.env.MONGO_DATABASE);
		const users = db.collection("users");
		const user = await users.findOne({ resetPassword: ctx.query.id });
		return {
			props: {
				email: user.email,
			},
		};
	} finally {
		client.close();
	}
}
