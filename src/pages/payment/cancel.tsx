import Layout from "../../layouts/Main";
//clear the redux state
export default function Named() {
	return (
		<Layout>
			<section className="error-page">
				<div className={"container"}>
					<h1>Canceled Checkout</h1>
					<p>Go to the cart to checkout again. </p>
					<a href={"/"} className={"btn btn--rounded btn--yellow"}>
						Return Home
					</a>
				</div>
			</section>
		</Layout>
	);
}
