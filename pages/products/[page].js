import Layout from "../../layouts/Main";
import Footer from "../../components/footer";
import Breadcrumb from "../../components/breadcrumb";
import ProductsContent from "../../components/products-content";
import { useRouter } from "next/router";
import { server } from "../../utils/server";
const products = ({ data }) => {
	const router = useRouter();
	const { page } = router.query;

	return (
		<Layout>
			<Breadcrumb />
			<section className="products-page">
				<div className="container">
					<ProductsContent data={data} />
				</div>
			</section>
			<Footer />
		</Layout>
	);
};

export async function getServerSideProps(context) {
	return new Promise((resolve, reject) => {
		console.log("getServerSideProps Going Page: " + context.query.page);
		fetch(`${server}/api/products/${context.query.page}`)
			.then(res => res.json())
			.then(res => {
				console.log("fetched");
				resolve({
					props: {
						data: res["data"],
					},
				});
			});
	});
}

export default products;
