import Layout from "../../layouts/Main";
import Footer from "../../components/footer";
import Breadcrumb from "../../components/breadcrumb";
import ProductsContent from "../../components/products-content";
import { useRouter } from "next/router";
import server from "../../utils/server";
export default function Named({ data }) {
	const router = useRouter();

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
}
export async function getServerSideProps(context) {
	return new Promise((resolve, reject) => {
		const res = fetch(`http://localhost:3000/api/products`)
			.then(res => res.json())
			.then(res => {
				var list = [];
				for (var i = 0; i < res.length; i++) {
					const datapoint = res[i];
					if (
						datapoint.name
							.toLowerCase()
							.search(context.query.query) != -1
					) {
						list.push(datapoint);
					}
				}
				resolve({
					props: {
						data: list,
					},
				});
			});
	});
}
