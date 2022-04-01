import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { EffectFade, Navigation } from "swiper";
import Image from "next/image";
SwiperCore.use([EffectFade, Navigation]);

const PageIntro = () => {
	return (
		<section className="page-intro">
			<Swiper
				navigation
				effect="fade"
				className="swiper-wrapper"
				slidesPerView={"auto"}
			>
				<SwiperSlide>
					<div
						className="page-intro__slide"
						style={{
							// backgroundImage: "url('/images/anxiocalm.png')",
							backgroundSize: "auto",
						}}
					>
						<Image
							src="/images/anxiocalm.png"
							layout="fill"
							objectFit="contain"
						/>
						<div className="container">
							<div className="page-intro__slide__content">
								<h2>DNA Nutrition </h2>
								<a href="/products/1" className="btn-shop">
									<i className="icon-right"></i>Shop now
								</a>
							</div>
						</div>
					</div>
				</SwiperSlide>
				<SwiperSlide>
					<div
						className="page-intro__slide"
						style={
							{
								// backgroundImage: "url('/images/slide-2.jpg')",
							}
						}
					>
						<Image
							src="/images/slide-2.jpg"
							layout="fill"
							objectFit="contain"
						/>
						<div className="container">
							<div className="page-intro__slide__content">
								<h2>DNA Nutrition </h2>
								<a href="/products/1" className="btn-shop">
									<i className="icon-right"></i>Shop now
								</a>
							</div>
						</div>
					</div>
				</SwiperSlide>
			</Swiper>

			<div className="shop-data">
				<div className="container">
					<ul className="shop-data__items">
						<li>
							<i className="icon-home"></i>
							<div className="data-item__content">
								<h4>Support Small Buisnesses</h4>
								<p>We are a small, family owned buisness</p>
							</div>
						</li>

						<li>
							<i className="icon-happy"></i>
							<div className="data-item__content">
								<h4>99% Satisfied Customers</h4>
								<p>
									Our clients' opinions speak for themselves
								</p>
							</div>
						</li>

						<li>
							<i className="icon-cash"></i>
							<div className="data-item__content">
								<h4>Run By Experts</h4>
								<p>
									Call to get Personalized Nutrition Support
								</p>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</section>
	);
};

export default PageIntro;
