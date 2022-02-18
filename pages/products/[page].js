import Layout from "../../layouts/Main";
import Footer from "../../components/footer";
import Breadcrumb from "../../components/breadcrumb";
import ProductsContent from "../../components/products-content";
import { useRouter } from "next/router";

const products = () => {
	const router = useRouter();
	const { page } = router.query;
	return (
		<Layout>
			<Breadcrumb />
			<section className="products-page">
				<div className="container">
					<ProductsContent page={page} />
				</div>
			</section>
			<Footer />
		</Layout>
	);
};

export default products;
