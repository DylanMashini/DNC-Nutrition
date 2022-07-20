import Layout from "../layouts/Main";

export default function Named() {
	return (
		<Layout>
			<section className="error-page">
				<div className={"container"}>
					<h1>Contact Us</h1>
					<p>Click below to email us at dncnutritionatl@gmail.com</p>
					<a
						href={"mailto:dncnutritionatl@gmail.com"}
						className={"btn btn--rounded btn--yellow"}
					>
						Email Us
					</a>
				</div>
			</section>
		</Layout>
	);
}
