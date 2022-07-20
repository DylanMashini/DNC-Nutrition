import { useState } from "react";
import CheckboxColor from "./../../products-filter/form-builder/checkbox-color";
import { useDispatch, useSelector } from "react-redux";
import { some } from "lodash";
import { addProduct } from "./../../../store/actions/cartActions";
import { toggleFavProduct } from "./../../../store/actions/userActions";

const Content = ({ product }) => {
	const dispatch = useDispatch();
	const [count, setCount] = useState(1);

	const { favProducts } = useSelector(state => state.user);
	const isFavourite = some(
		favProducts,
		productId => productId === product.id
	);

	const toggleFav = () => {
		dispatch(
			toggleFavProduct({
				id: product.id,
			})
		);
	};

	const addToCart = () => {
		dispatch(
			addProduct({
				id: product.id,
				name: product.name,
				thumb: product.images[0],
				price: product.currentPrice,
				count: count,
			})
		);
	};

	return (
		<section className="product-content">
			<div className="product-content__intro">
				<h5 className="product__id">
					Product ID:<br></br>
					{product.id}
				</h5>
				<span className="product-on-sale">Sale</span>
				<h2 className="product__name">{product.name}</h2>

				<div className="product__prices">
					<h4>${product.currentPrice}</h4>
					{product.discount && <span>${product.price}</span>}
				</div>
			</div>

			<div className="product-content__filters">
				<div className="product-filter-item">
					<div className="checkbox-color-wrapper"></div>
				</div>
				<div className="product-filter-item">
					<div className="checkbox-color-wrapper"></div>
				</div>
				<div className="product-filter-item">
					<h5>Quantity:</h5>
					<div className="quantity-buttons">
						<div className="quantity-button">
							<button
								type="button"
								onClick={() => {
									if (count > 1) {
										setCount(count - 1);
									}
								}}
								className="quantity-button__btn"
							>
								-
							</button>
							<span>{count}</span>
							<button
								type="button"
								onClick={() => setCount(count + 1)}
								className="quantity-button__btn"
							>
								+
							</button>
						</div>

						<button
							type="submit"
							onClick={() => addToCart()}
							className="btn btn--rounded btn--yellow"
						>
							Add to cart
						</button>
						{/* <button
							type="button"
							onClick={toggleFav}
							className={`btn-heart ${
								isFavourite ? "btn-heart--active" : ""
							}`}
						> */}
						{/* <i className="icon-heart"></i>
						</button> */}
					</div>
				</div>
			</div>
		</section>
	);
};

export default Content;
