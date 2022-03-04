import Layout from "../layouts/Main";
import PageIntro from "../components/page-intro";
import ProductsFeatured from "../components/products-featured";
import Footer from "../components/footer";
import Subscribe from "../components/subscribe";

const IndexPage = () => {
	return (
		<Layout>
			<PageIntro />

			<section className="featured">
				<div className="container">
					<article
						style={{
							backgroundImage: "url(/images/featured-1.jpg)",
						}}
						className="featured-item featured-item-large"
					>
						<div className="featured-item__content">
							<h3>
								Suplements that everyone should take regularly!
							</h3>
							<a href="#" className="btn btn--rounded">
								Read Now
							</a>
						</div>
					</article>

					{/* <article
						style={{
							backgroundImage: "url(/images/featured-2.jpg)",
						}}
						className="featured-item featured-item-small-first"
					>
						<div className="featured-item__content">
							<h3>Basic t-shirts $29,99</h3>
							<a href="#" className="btn btn--rounded">
								More details
							</a>
						</div>
					</article>

					<article
						style={{
							backgroundImage: "url(/images/featured-3.jpg)",
						}}
						className="featured-item featured-item-small"
					>
						<div className="featured-item__content">
							<h3>Sale this summer</h3>
							<a href="#" className="btn btn--rounded">
								VIEW ALL
							</a>
						</div>
					</article> */}
				</div>
			</section>

			<section className="section">
				<div className="container">
					<header className="section__intro">
						<h4>Why should you choose us?</h4>
					</header>

					<ul className="shop-data-items">
						<li>
							<i className="icon-home"></i>
							<div className="data-item__content">
								<h4>Support Small Buisnesses</h4>
								<p>We are a small, family owned buisness.</p>
							</div>
						</li>

						<li>
							<i className="icon-payment"></i>
							<div className="data-item__content">
								<h4>Easy Payments</h4>
								<p>
									All payments are processed instantly over a
									secure payment protocol.
								</p>
							</div>
						</li>

						<li>
							<i className="icon-cash"></i>
							<div className="data-item__content">
								<h4>Money-Back Guarantee</h4>
								<p>
									If an item arrived damaged or you've changed
									your mind, you can send it back for a full
									refund.
								</p>
							</div>
						</li>

						<li>
							<i className="icon-materials"></i>
							<div className="data-item__content">
								<h4>Finest Quality</h4>
								<p>
									Our selection is currated by a nutritionist
									with a degree in microbiology.
								</p>
							</div>
						</li>
					</ul>
				</div>
			</section>

			{/* <ProductsFeatured /> */}
			<Subscribe />
			<Footer />
		</Layout>
	);
};

export default IndexPage;
//logo idea
//https://www.vectorstock.com/royalty-free-vector/dna-logo-design-template-modern-medical-vector-14826615
//add newsletter functionality
