import { useState } from "react";
import Image from "next/image";
const Subscribe = () => {
	const [email, setEmail] = useState("");
	const SubmitPress = () => {
		//add email to newsletter
	};
	return (
		<section className="subscribe">
			<div className="container">
				<div
					style={
						{
							//  backgroundImage: "url(/images/subscribe.jpg)"
						}
					}
					className="subscribe__content"
				>
					<Image
						alt=""
						src="/images/subscribe.jpg"
						layout="fill"
						objectFit="cover"
					/>
					<h4>
						Subscribe to our newsletter and receive exclusive offers
						every week
					</h4>

					<form className="subscribe__form">
						<input
							type="email"
							placeholder="Email address"
							value={email}
							onChange={e => setEmail(e.target.value)}
						/>
						<button
							type="submit"
							className="btn btn--rounded btn--yellow"
							onClick={SubmitPress}
						>
							Subscribe
						</button>
					</form>
				</div>
			</div>
		</section>
	);
};

export default Subscribe;
