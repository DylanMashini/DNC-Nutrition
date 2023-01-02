export type Order = {
	orderID: string;
	status: "paid" | "sent";
	email: string;
	items: string;
	stripeID: string;
};
