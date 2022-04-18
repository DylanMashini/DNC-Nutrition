import React, { Fragment } from "react";
import Router from "next/router";
import { wrapper } from "../store";
import { CookiesProvider } from "react-cookie";
import Script from "next/script";
import { useEffect } from "react";
// global styles
import "swiper/swiper.scss";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";
import "../assets/css/styles.scss";

// only events on production

const MyApp = ({ Component, pageProps }) => {
	const isProduction = process.env.NODE_ENV === "production";
	useEffect(() => {
		if (isProduction && typeof gtag.pageview !== "undefined") {
			console.log(typeof gtag.pageview);
			// Notice how we track pageview when route is changed
			Router.events.on("routeChangeComplete", url => gtag.pageview(url));
		}
	});

	return (
		<CookiesProvider>
			<Fragment>
				{isProduction && !process.env.SKIP_TRACK ? (
					<>
						<Script
							strategy="lazyOnload"
							src={
								"https://www.googletagmanager.com/gtag/js?id=G-3QYSYY399Z"
							}
						/>
						<Script strategy="lazyOnload" id="gtag-script-2">
							{`window.dataLayer = window.dataLayer || [];
						function gtag(){dataLayer.push(arguments);}
						gtag('js', new Date());

						gtag('config', 'G-3QYSYY399Z');`}
						</Script>
					</>
				) : null}
				<Component {...pageProps} />
			</Fragment>
		</CookiesProvider>
	);
};

export default wrapper.withRedux(MyApp);
