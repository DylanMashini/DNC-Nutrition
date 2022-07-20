import ProductsPage from "../[page]";
import categories from "../../../data/categories.json";

export default function Products({ data, totalPages, page, cat }) {
	return (
		<ProductsPage
			data={data}
			pagenum={page}
			totalPages={totalPages}
			category={cat}
		/>
	);
}

export async function getStaticProps({ params }) {
	let allProds = await fetch(
		"https://dylanmashini.github.io/DNANutrition/prods.json"
	).then(res => res.json());
	return new Promise((resolve, reject) => {
		let totalPages = 1;
		allProds = allProds.filter(item =>
			item.categories.includes(params["cat"])
		);
		totalPages = 1;
		var list = [];
		for (var i = 0; i < allProds.length; i++) {
			if (i > 1 * 40) {
				break;
			}
			if (i >= (1 - 1) * 40) {
				list.push(allProds[i]);
			}
		}
		resolve({
			props: {
				data: list,
				pagenum: 1,
				totalPages: totalPages,
				cat: params["cat"],
			},
			revalidate: 3600,
		});
	});
}
export async function getStaticPaths() {
	const paths = [];
	for (let i = 0; i < categories.length; i++) {
		paths.push({
			params: {
				cat: categories[i],
			},
		});
	}
	return { paths, fallback: true };
}
