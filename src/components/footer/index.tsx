import Logo from "../../assets/icons/logo";

const Footer = () => {
	return (
		<footer className="site-footer">
			<div className="container">
				<div className="site-footer__top">
					<div className="site-footer__description">
						<h6>
							<Logo />
						</h6>
						<br />
						<p></p>
						<ul className="site-footer__social-networks">
							<li>
								<a href="https://www.facebook.com/discountnutritionansley/">
									<i className="icon-facebook"></i>
								</a>
							</li>
							{/* <li>
								<a href="#">
									<i className="icon-twitter"></i>
								</a>
							</li> */}
							{/* <li>
								<a href="#">
									<i className="icon-linkedin"></i>
								</a>
							</li> */}
							<li>
								<a href="https://www.instagram.com/discountnutritionga/">
									<i className="icon-instagram"></i>
								</a>
							</li>
							{/* <li>
								<a href="#">
									<i className="icon-youtube-play"></i>
								</a>
							</li> */}
						</ul>
					</div>

					<div className="site-footer__links">
						{/* <ul>
							<li>Shopping online</li>
							<li>
								<a href="#">Order Status</a>
							</li>
							<li>
								<a href="#">Shipping and Delivery</a>
							</li>
							<li>
								<a href="#">For Returns Call the Number Below</a>
							</li>
							<li>
								<a href="#">Payment options</a>
							</li>
							<li>
								<a href="#">Contact Us</a>
							</li>
						</ul>
						<ul>
							<li>Information</li>
							<li>
								<a href="#">Gift Cards</a>
							</li>
							<li>
								<a href="#">Find a store</a>
							</li>
							<li>
								<a href="#">Newsletter</a>
							</li>
							<li>
								<a href="#">Bacome a member</a>
							</li>
							<li>
								<a href="#">Site feedback</a>
							</li>
						</ul> */}
						<ul>
							<li>Our Locations</li>
							<li>
								<a
									href="https://g.page/discount-nutrition-atlanta?share"
									target="_blank"
									rel="noreferrer"
								>
									1544 Piedmont Rd NE Ste 318, Atlanta, GA
									30324
								</a>
							</li>
							<li>
								<a
									href="https://goo.gl/maps/LS2ncnDdjoeD2MdH8"
									target="_blank"
									rel="noreferrer"
								>
									3345 Cobb Pkwy NW #600, Acworth, GA 30101
								</a>
							</li>
						</ul>
						<ul>
							<li>Contact</li>
							<li>
								<a href="mailto:discountnutritionatl@gmail.com">
									discountnutritionatl@gmail.com
								</a>
							</li>
							<li>
								<a href="#">Phone Number: +1 (404) 228 2712</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
