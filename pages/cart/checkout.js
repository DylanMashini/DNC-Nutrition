import Layout from "../../layouts/Main";
import { useSelector } from "react-redux";
import CheckoutStatus from "../../components/checkout-status";
import CheckoutItems from "../../components/checkout/items";
import { useState } from "react";
import Router from "next/router";
import { server } from "../../utils/server";

const CheckoutPage = () => {
	const [email, setEmail] = useState("");
	const [Address, setAddress] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [city, setCity] = useState("");
	const [zipCode, setZipCode] = useState("");
	const ProceedToPayment = async () => {
		const lineItems = [];
		for (let i = 0; i < cartItems.length; i++) {
			console.log(cartItems[i]);
			const item = cartItems[i];
			const { id, count, name } = item;
			console.log("idherhe: " + id);
			lineItems.push({ id: id, count: count });
		}
		Router.push({
			pathname: "/cart/loading",
			query: { lineItems: JSON.stringify(lineItems) },
		});
	};
	const priceTotal = useSelector(state => {
		const cartItems = state.cart.cartItems;
		let totalPrice = 0;
		if (cartItems.length > 0) {
			cartItems.map(item => (totalPrice += item.price * item.count));
		}

		return totalPrice;
	});
	const cartItems = useSelector(state => state.cart.cartItems);

	const TaxTotal = (Number(priceTotal) * 0.089).toFixed(2);
	return (
		<Layout>
			<section className="cart">
				<div className="container">
					<div className="cart__intro">
						<h3 className="cart__title">Shipping and Payment</h3>
						<CheckoutStatus step="checkout" />
					</div>

					<div className="checkout-content">
						<div className="checkout__col-6">
							<div className="checkout__btns"></div>

							<div className="block">
								<h3 className="block__title">
									Shipping information
								</h3>
								<form className="form">
									<div className="form__input-row form__input-row--two">
										<div className="form__col">
											<input
												className="form__input form__input--sm"
												type="text"
												placeholder="Email"
												value={email}
												onChange={e =>
													setEmail(e.target.value)
												}
											/>
										</div>

										<div className="form__col">
											<input
												className="form__input form__input--sm"
												type="text"
												placeholder="Address"
												value={Address}
												onChange={e =>
													setAddress(e.target.value)
												}
											/>
										</div>
									</div>

									<div className="form__input-row form__input-row--two">
										<div className="form__col">
											<input
												className="form__input form__input--sm"
												type="text"
												placeholder="First name"
												value={firstName}
												onChange={e =>
													setFirstName(e.target.value)
												}
											/>
										</div>

										<div className="form__col">
											<input
												className="form__input form__input--sm"
												type="text"
												placeholder="City"
												value={city}
												onChange={e =>
													setCity(e.target.value)
												}
											/>
										</div>
									</div>

									<div className="form__input-row form__input-row--two">
										<div className="form__col">
											<input
												className="form__input form__input--sm"
												type="text"
												placeholder="Last name"
												value={lastName}
												onChange={e =>
													setLastName(e.target.value)
												}
											/>
										</div>

										<div className="form__col">
											<input
												className="form__input form__input--sm"
												type="text"
												placeholder="Postal code / ZIP"
												value={zipCode}
												onChange={e =>
													setZipCode(e.target.value)
												}
											/>
										</div>
									</div>

									<div className="form__input-row form__input-row--two">
										<div className="form__col">
											<input
												className="form__input form__input--sm"
												type="text"
												placeholder="Phone number"
												value={phoneNumber}
												onChange={e =>
													setPhoneNumber(
														e.target.value
													)
												}
											/>
										</div>
										<div className="form_col">
											<h2>
												Shipping is US only right now
											</h2>
										</div>
										{/* <div className="form__col">
											<div className="select-wrapper select-form">
												<select>
													<option>Country</option>
													<option value="argentina"></option>
												</select>
											</div>
										</div> */}
									</div>
								</form>
							</div>
						</div>

						<div className="checkout__col-4">
							<div className="block">
								<h3 className="block__title"></h3>
							</div>

							<div className="block">
								<h3 className="block__title"></h3>
							</div>
						</div>

						<div className="checkout__col-2">
							<div className="block">
								<h3 className="block__title">Your cart</h3>
								<CheckoutItems />

								<div className="checkout-total">
									<p>Subtotal</p>
									<h3>${priceTotal}</h3>
								</div>
								<div className="checkout-total">
									<p>Tax</p>
									<h3>{"$" + TaxTotal}</h3>
								</div>
								<div className="checkout-total">
									<p>Total</p>
									<h3>
										{"$" +
											(
												Number(priceTotal) * 1.089
											).toFixed(2)}
									</h3>
								</div>
							</div>
						</div>
					</div>

					<div className="cart-actions cart-actions--checkout">
						<a href="/cart" className="cart__btn-back">
							<i className="icon-left"></i> Back
						</a>
						<div className="cart-actions__items-wrapper">
							<button
								type="button"
								className="btn btn--rounded btn--border"
							>
								Continue shopping
							</button>
							<button
								type="button"
								className="btn btn--rounded btn--yellow"
								onClick={ProceedToPayment}
							>
								Proceed to payment
							</button>
						</div>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default CheckoutPage;
