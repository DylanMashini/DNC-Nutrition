import { useState } from "react";
import Footer from "../../components/footer";
import Layout from "../../layouts/Main";
import Breadcrumb from "../../components/breadcrumb";
import ProductsFeatured from "../../components/products-featured";
import Gallery from "../../components/product-single/gallery";
import Content from "../../components/product-single/content";
import Description from "../../components/product-single/description";
import Reviews from "../../components/product-single/reviews";
import { server } from "../../utils/server";

export async function getStaticPaths() {
	return { paths: [], fallback: "blocking" };
}
export async function getStaticProps({ params }) {
	const pid = params.pid;
	const res = await fetch(`${server}/api/product/${pid}`);
	const product = await res.json();

	return {
		props: {
			product,
		},
		revalidate: 90000,
	};
}

const Product = ({ product }) => {
	const [showBlock, setShowBlock] = useState("description");

	return (
		<Layout title={product.name}>
			<Breadcrumb />

			<section className="product-single">
				<div className="container">
					<div className="product-single__content">
						<Gallery images={product.images} />
						<Content product={product} />
					</div>

					<div className="product-single__info"></div>
				</div>
			</section>

			{/* <div className="product-single-page">
				<ProductsFeatured />
			</div> */}
			<Footer />
		</Layout>
	);
};

export default Product;
