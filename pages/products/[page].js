import Layout from "../../layouts/Main";
import Footer from "../../components/footer";
import Breadcrumb from "../../components/breadcrumb";
import ProductsContent from "../../components/products-content";
import { useRouter } from "next/router";
import { server } from "../../utils/server";
import { Pagination } from "@nextui-org/react";
import { useEffect, useState } from "react";
import Head from "next/head";

const Products = ({ data, pagenum, totalPages }) => {
	const router = useRouter();
	useEffect(() => {
		router.prefetch("/products/" + (pagenum + 1));
	});

	return (
		<Layout title="Shop DNC Nutrition">
			<Breadcrumb />
			<section className="products-page">
				<div className="container">
					<ProductsContent data={data} />
				</div>
			</section>
			{pagenum ? (
				<div id={"Pagination"}>
					<Pagination
						initialPage={parseInt(pagenum)}
						page={parseInt(pagenum)}
						total={parseInt(totalPages)}
						onChange={p => {
							router.push("/products/" + p);
						}}
						size={"lg"}
					/>
				</div>
			) : null}
			<Footer />
		</Layout>
	);
};

export async function getStaticProps({ params }) {
	return new Promise((resolve, reject) => {
		let totalPages = 100;
		const allProds = require("../../prods.json");
		totalPages = Math.trunc(allProds.length / 21);
		var list = [];
		for (var i = 0; i < allProds.length; i++) {
			if (i > params.page * 20) {
				break;
			}
			if (i >= (params.page - 1) * 20) {
				list.push(allProds[i]);
			}
		}
		resolve({
			props: {
				data: list,
				pagenum: params.page,
				totalPages: totalPages,
			},
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
export default Products;

//lighthouse performance of 60 before optimizing
//
