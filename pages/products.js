import Layout from "../layouts/Main";
import Footer from "../components/footer";
import Breadcrumb from "../components/breadcrumb";
import ProductsContent from "../components/products-content";

const Products = () => (
	<Layout>
		<Breadcrumb />
		<section className="products-page">
			<div className="container">
				<ProductsContent />
			</div>
		</section>
		<Footer />
	</Layout>
);

export default Products;
