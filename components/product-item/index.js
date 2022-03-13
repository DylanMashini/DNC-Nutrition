import Link from "next/link";
import { some } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavProduct } from "./../../store/actions/userActions";
import Image from "next/image";
const ProductItem = ({
	discount,
	productImage,
	id,
	name,
	price,
	currentPrice,
	dimensions,
}) => {
	const dispatch = useDispatch();
	const { favProducts } = useSelector(state => state.user);

	const isFavourite = some(favProducts, productId => productId === id);

	const toggleFav = () => {
		dispatch(
			toggleFavProduct({
				id,
			})
		);
	};

	return (
		<div className="product-item">
			<div className="product__image">
				{/* <button
					type="button"
					onClick={toggleFav}
					className={`btn-heart ${
						isFavourite ? "btn-heart--active" : ""
					}`}
				>
					<i className="icon-heart"></i>
				</button> */}

				<Link href={`/product/${id}`}>
					<a>
						<Image
							src={productImage}
							alt="product"
							objectFit="contain"
							style={{ "object-fit": "contain" }}
							width={dimensions.width}
							height={dimensions.height}
							// rel="preload"
						/>
						{discount && (
							<span className="product__discount">
								{discount}%
							</span>
						)}
					</a>
				</Link>
			</div>

			<div className="product__description">
				<h3>{name}</h3>
				<div
					className={
						"product__price " +
						(discount ? "product__price--discount" : "")
					}
				>
					<h4>${currentPrice}</h4>

					{discount && <span>${price}</span>}
				</div>
			</div>
		</div>
	);
};

export default ProductItem;
