import { useState } from "react";
import List from "./list";
import Categories from "../../categories.json";
import { useRouter } from "next/router";
const ProductsContent = ({ page, data, category = "All" }) => {
	const [orderProductsOpen, setOrderProductsOpen] = useState(false);
	const router = useRouter();
	const categories = Categories.map(cat => {
		return <option>{cat}</option>;
	});
	const [renderedData, setRenderedData] = useState(data);
	// const [filter, setFilter] = useState<String | Boolean>(false);
	if (data != null) {
		return (
			<section className="products-content">
				<div className="products-content__intro">
					<h2>All Supplements</h2>
					<button
						type="button"
						onClick={() => setOrderProductsOpen(!orderProductsOpen)}
						className="products-filter-btn"
					>
						<i className="icon-filters"></i>
					</button>
					<form
						className={`products-content__filter ${
							orderProductsOpen ? "products-order-open" : ""
						}`}
					>
						<div className="products__filter__select">
							<h4>Category: </h4>
							<div className="select-wrapper">
								<select
									defaultValue={category}
									onChange={e => {
										const val = e.target.value;
										if (val == "All") {
											router.push("/products/1");
										} else {
											router.push(
												`/products/category/${val}`
											);
										}
									}}
								>
									<option>All</option>
									{categories}
								</select>
							</div>
						</div>
					</form>
				</div>

				<List data={data} page={page} />

				{/* Add Page Switcher here */}
			</section>
		);
	}
	return (
		<section className="products-content">
			<div className="products-content__intro">
				<h2>All Supplements</h2>
				<button
					type="button"
					onClick={() => setOrderProductsOpen(!orderProductsOpen)}
					className="products-filter-btn"
				>
					<i className="icon-filters"></i>
				</button>
				<form
					className={`products-content__filter ${
						orderProductsOpen ? "products-order-open" : ""
					}`}
				>
					<div className="products__filter__select">
						<h4>Show products: </h4>
						<div className="select-wrapper">
							<select>
								<option>Popular</option>
							</select>
						</div>
					</div>
					<div className="products__filter__select">
						<h4>Sort by: </h4>
						<div className="select-wrapper">
							<select>
								<option>Popular</option>
							</select>
						</div>
					</div>
				</form>
			</div>

			<List page={page} data={renderedData} />

			{/* Add Page Switcher here */}
		</section>
	);
};

export default ProductsContent;
