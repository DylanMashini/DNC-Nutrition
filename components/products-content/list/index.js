import useSwr from "swr";
import ProductItem from "./../../product-item";
import ProductsLoading from "./loading";
import { useEffect, useState } from "react";
const ProductsContent = ({ data, page }) => {
	if (page == null) {
		page = 1;
	}
	// const fetcher = url => fetch(url).then(res => res.json());
	// const { data, error } = useSwr("/api/products", fetcher);
	// const [finalData, setFinalData] = useState(undefined);
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
									dimensions={item.dimensions}
								/>
							)
					)}
				</section>
			)}
		</>
	);
};

export default ProductsContent;
