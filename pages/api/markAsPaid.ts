import type { NextApiRequest, NextApiResponse } from "next";
import { buffer } from "micro";

export const config = {
	api: {
		bodyParser: false,
	},
};

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method != "POST") {
		res.status(405).end();
		return;
	}
	const fulfillOrder = session => {
		const orderID = session.metadata.cloverID;
		const address = session.shipping;
		fetch(`https://scl.clover.com/v1/orders/${orderID}/pay`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${process.env.CLOVER_ECOMMERCE}`,
			},
			body: JSON.stringify({
				tender: { label: "stripe" },
				ecomind: "ecom",
			}),
		})
			.then(result => result.json())
			.then(result => {
				if (result.status != "paid") {
					console.log(JSON.stringify(result));
					console.log("NOT MARKED AS PAID IN CLOVER");
					console.log("CLOVER ORDER ID: " + orderID);
					console.log("STRIPE PAYMENT" + JSON.stringify(session));
					const sgMail = require("@sendgrid/mail");
					sgMail.setApiKey(process.env.SENDGRID_API_KEY);
					const msg = {
						to: "dylanmashini123@gmail.com", // Change to your recipient
						from: "ecommerce@dylanmashini.com", // Change to your verified sender
						subject: "Error in marking order as paid in clover",
						text: "error marking order as paid",
						html: `
            <h1>Error marking order as paid</h1>
            <p>Clover Order ID: ${orderID}</p>
            <p>Stripe Payment: ${JSON.stringify(session)}</p>
            `,
					};
					sgMail
						.send(msg)
						.then(() => {
							res.status(400).end();
						})
						.catch(error => {
							console.error(error);
						});
				} else {
					console.log(session);

					//create list of order items here
					const orderItems = JSON.parse(session.metadata.lineItems);
					let emailItems = ``;
					for (let i = 0; i < orderItems.length; i++) {
						const item = orderItems[i];
						emailItems = emailItems.concat(`
                <li>
                    <div
                        style=" width: 30em; border-style:solid; margin-top: 2em;">
                        <div style="text-align:center;">
                            <img src="https://www.dncnutrition.com/products/${
								item.sku
							}.jpeg" width="200px">
                        </div>
                        <div style="text-align:center;">
                            <h3>${String(item.qty)}x ${item.name}</h3>
                            <h4>$${item.price}</h4>
                        </div>
                    </div>
                </li>\n
                `);
					}
					const msg = {
						to: "discountnutritionatl@gmail.com", // Change to your recipient
						from: "ecommerce@dylanmashini.com", // Change to your verified sender
						subject: `Ecommerce Order ID:${orderID}`,
						text: "Order",
						html: `
            <h1>Got a Order!</h1>
            <p>Clover Order ID: ${orderID}</p>
            <p>Paid in stripe</p>
            <br />
            <p>Order Items: </p>
            <ul style="list-style-type: none;">
                ${emailItems}
            </ul>
            <br />
            <p>Customer Phone Number: ${
				session["customer_details"]["phone"]
			}</p>
            <p>Customer Email: ${session["customer_details"]["email"]}</p>
            <p>Customer Name: ${session["customer_details"]["name"]}</p>
            <p>Customer Address Line 1: ${
				session["customer_details"]["address"]["line1"]
			}</p>
            ${
				session["customer_details"]["address"]["line2"]
					? `<p>Customer Address Line 2: ${session["customer_details"]["address"]["line2"]}</p>`
					: ""
			}
            <p>Customer City: ${
				session["customer_details"]["address"]["city"]
			}</p>
            <p>Customer State: ${
				session["customer_details"]["address"]["state"]
			}</p>
            <p>Customer Zip: ${
				session["customer_details"]["address"]["postal_code"]
			}</p>
            `,
					};
					sgMail.send(msg).catch(error => {
						console.error(error);
					});

					//send the confirmation email to the coustomer here
					const CustomerMsg = {
						to: session["customer_details"]["email"],
						from: "ecommerce@dylanmashini.com",
						subject: "DNC Nutrition Order Confirmation",
						text: "Order Confirmation",
						html: `
                        h1>Order Confrimation Email</h1>
                        <h4>Thanks For your Order From DNC Nutrition!</h4>
                        <br />
                        <p>Order Items: </p>
                        <ul style="list-style-type: none;">
                            ${emailItems}
                        </ul>
                        <br />
                        <h2>Your order will ship within the next 3 days</h2>
                        `,
					};
					sgMail
						.send(msg)
						.then(() => {
							res.status(200).end();
						})
						.catch(error => console.error(error));
				}
			})
			.catch(err => {
				//send simple email
				const msg2 = {
					to: "dylanmashini123@gmail.com",
					from: "ecommerce@dylanmashini.com",
					subject: "Error in sending email",
					text: "error sending email",
					html: `
        <h1>Error sending email</h1>
        ${
			orderID
				? `<p>Clover Order ID: ${orderID}</p>`
				: "<p>Clover Order ID evaluated to false</p>"
		}
        ${
			session
				? `<p>Stripe Payment: ${JSON.stringify(session)}</p>`
				: "<p>Stripe Payment Session evaluated to false</p>"
		}
        `,
				};
				sgMail.send().then(() => {
					console.error(err);
					res.status(400).end();
					return;
				});
			});
	};
	const buf = await buffer(req);
	const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
	const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
	//get this from stripe dashboard
	const sig = req.headers["stripe-signature"];

	let event;
	try {
		event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
	} catch (err) {
		console.error(err);
		return res.status(400).send(`Webhook Error: ${err.message}`);
	}
	if (event.type === "checkout.session.completed") {
		const session = event.data.object;

		// Fulfill the purchase...
		fulfillOrder(session);
	}

	res.status(200);
};
