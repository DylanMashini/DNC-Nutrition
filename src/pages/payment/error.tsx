import Layout from "../../layouts/Main";
//clear the redux state
export default function Named() {
	return (
		<Layout>
			<section className="error-page">
				<div className={"container"}>
					<h1>Error</h1>
					<p>We're sorry, click below to contact us via email </p>
					<a
						href={"mailto:discountnutritionatl@gmail.com"}
						className={"btn btn--rounded btn--yellow"}
					>
						Email Us!
					</a>
				</div>
			</section>
		</Layout>
	);
}
