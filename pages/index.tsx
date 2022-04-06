import Products from "./products/[page].js";
export default function Home({data, totalPages}) {
    return <Products pagenum={1} data={data} totalPages={totalPages}/>;
}

export async function getStaticProps() {
	return new Promise((resolve, reject) => {
		let totalPages = 100;
		const allProds = require("../prods.json");
		totalPages = Math.trunc(allProds.length / 21);
		var list = [];
		for (var i = 0; i < allProds.length; i++) {
			if (i > 1 * 20) {
				break;
			}
			if (i >= (1 - 1) * 20) {
				list.push(allProds[i]);
			}
		}
		resolve({
			props: {
				data: list,
				pagenum: 1,
				totalPages: totalPages,
			},
		});
	});
}