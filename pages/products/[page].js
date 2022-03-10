import Layout from "../../layouts/Main";
import Footer from "../../components/footer";
import Breadcrumb from "../../components/breadcrumb";
import ProductsContent from "../../components/products-content";
import { useRouter } from "next/router";
import { server } from "../../utils/server";
import { Pagination } from "@nextui-org/react";
import { useState } from "react";
const products = ({ data, page = 1, totalPages }) => {
	const router = useRouter();
	return (
		<Layout>
			<Breadcrumb />
			<section className="products-page">
				<div className="container">
					<ProductsContent data={data} />
				</div>
			</section>
			<div id={"Pagination"}>
				<Pagination
					initialPage={page}
					total={totalPages}
					onChange={p => {
						router.push("/products/" + p);
					}}
					size={"lg"}
				/>
			</div>
			<Footer />
		</Layout>
	);
};

export async function getStaticProps({ params }) {
	return new Promise((resolve, reject) => {
		let totalPages = 100;
		fetch("http://dna-nutrition.vercel.app/api/products/")
			.then(res => res.json())
			.then(res => {
				totalPages = Math.trunc(res.length / 21);
				console.log(totalPages);
				fetch(
					`http://dna-nutrition.vercel.app/api/products/` +
						params.page
				)
					.then(res => res.json())
					.then(res => {
						console.log("fetched");
						resolve({
							props: {
								data: res.data,
								pagenum: params.page,
								totalPages: totalPages,
							},
						});
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
