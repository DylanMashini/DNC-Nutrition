import useSwr from "swr";
import ProductItem from "./../../product-item";
import ProductsLoading from "./loading";

const ProductsContent = ({ page }) => {
	console.log("The PAGE: " + page);
	const fetcher = url => fetch(url).then(res => res.json());
	const { data, error } = useSwr("/api/products", fetcher);

	if (error) return <div>Failed to load users</div>;
	return (
		<>
			{!data && <ProductsLoading />}

			{data && (
				<section className="products-list">
					{data.map(
						(item, index) =>
							index >= (page - 1) * 40 &&
							index < page * 40 && (
								<ProductItem
									discount={item.discount}
									key={item.sku}
									id={item.sku}
									price={item.price}
									currentPrice={item.currentPrice}
									productImage={item.images[0]}
									name={item.name}
								/>
							)
					)}
				</section>
			)}
		</>
	);
};

export default ProductsContent;
