import { MongoClient } from "mongodb";
import { useState } from "react";

export default function Confirm({ order }) {
	// display order info and confirm button
	const [done, setDone] = useState(false);
	const confirmOrder = async () => {
		// change page to confirmed
		fetch("/api/markAsSent", {
			method: "POST",
			body: JSON.stringify({ orderID: order.orderID }),
			headers: {
				"Content-Type": "application/json",
			},
		});
		setDone(true);
	};
	if (!order)
		return (
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100vh",
					width: "100vw",
				}}
			>
				<h1>
					Order not found, contact me if you think this is an error
				</h1>
			</div>
		);
	if (done) {
		return (
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100vh",
					width: "100vw",
				}}
			>
				<h1>Order Confirmed</h1>
			</div>
		);
	}
	if (order.status == "sent") {
		return (
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					height: "100vh",
					width: "100vw",
				}}
			>
				<h1>Order Already Confirmed</h1>
			</div>
		);
	}
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
				minHeight: "100vh",
				width: "100vw",
			}}
		>
			<h1
				style={{
					fontSize: "1.5em",
				}}
			>
				Order Items:{" "}
			</h1>
			<ul
				style={{ listStyleType: "none" }}
				dangerouslySetInnerHTML={{ __html: order.items }}
			></ul>
			<br />
			<h3>Confirmation:</h3>
			<button
				style={{
					padding: ".5em",
					borderRadius: "0.5em",
					backgroundColor: "var(--color-orange)",
					marginTop: "1em",
				}}
				onClick={confirmOrder}
			>
				Confirm Order Shipped
			</button>
		</div>
	);
}

export async function getServerSideProps(context) {
	// get order info from clover
	const { id } = context.query;
	const client = new MongoClient(process.env.MONGO_URI);
	try {
		await client.connect();
		const db = client.db(process.env.MONGO_DATABASE);
		const collection = db.collection("orders");
		let order = await collection.findOne({ orderID: id });
		if (order) {
			return {
				props: {
					order: {
						orderID: order.orderID,
						email: order.email,
						items: order.items,
						status: order.status,
					},
				},
			};
		} else {
			return {
				props: {
					order: null,
				},
			};
		}
	} finally {
		client.close();
	}
}
