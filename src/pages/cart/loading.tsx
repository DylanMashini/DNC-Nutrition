import Layout from "../../layouts/Main";
import { useRouter } from "next/router";

import { server } from "../../utils/server";
import { useEffect, useState } from "react";

export default function Named({ lineItems, discount }) {
	const router = useRouter();
	const [error, setError] = useState("");
	useEffect(() => {
		fetch(`${server}/api/createPaymentSession/`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(lineItems),
		})
			.then(res => res.json())
			.then(res => {
				if (res.error) {
					switch (res.error) {
						case "Not enough in stock":
							setError("Not enough in stock");
							break;
					}
				} else {
					router.push(res.url);
				}
			})
			.catch(err => {
				console.error(err);
				setError(err.message);
			});
	});
	return (
		<Layout>
			<section className="error-page">
				<div className={"container"}>
					<h1>Loading</h1>
					<p>You will be redirected to the payment screen soon.</p>
					{error ? <p style={{ color: "red" }}>{error}</p> : null}
				</div>
			</section>
		</Layout>
	);
}

export function getServerSideProps(context) {
	return {
		props: {
			lineItems: JSON.parse(context.query.lineItems),
		},
	};
}
