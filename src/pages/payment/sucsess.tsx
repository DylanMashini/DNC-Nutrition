import Layout from "../../layouts/Main";
import { clearCart } from "../../store/actions/cartActions";
import { useDispatch } from "react-redux";
import { useEffect, useCallback } from "react";
//clear the redux state
export default function Named() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(clearCart());
	});

	return (
		<Layout>
			<section className="error-page">
				<div className={"container"}>
					<h1>Sucsessful Checkout</h1>
					<p>
						You will recive a confirmation email in your inbox soon
					</p>
					<a href={"/"} className={"btn btn--rounded btn--yellow"}>
						Return Home
					</a>
				</div>
			</section>
		</Layout>
	);
}
