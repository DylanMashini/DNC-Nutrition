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

export async function getStaticProps({ params }) {
	return new Promise((resolve, reject) => {
		fetch(`http://dna-nutrition.vercel.app/api/products/` + params.page)
			.then(res => res.json())
			.then(res => {
				console.log("fetched");
				resolve({
					props: {
						data: res.data,
					},
				});
			});
	});
}
export async function getStaticPaths() {
	const paths = [];
	for (let i = 1; i <= 10; i++) {
		paths.push({
			params: {
				page: i.toString(),
			},
		});
	}
	return { paths, fallback: true };
}
export default products;

//lighthouse performance of 60 before optimizing
//
