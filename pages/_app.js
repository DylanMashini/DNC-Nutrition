import React, { Fragment } from "react";
import Router from "next/router";
import { wrapper } from "../store";
import { CookiesProvider } from "react-cookie";
import Head from "next/head";
import Script from "next/script";
// global styles
import "swiper/swiper.scss";
import "rc-slider/assets/index.css";
import "react-rater/lib/react-rater.css";
import "../assets/css/styles.scss";

const isProduction = process.env.NODE_ENV === "production";

// only events on production
if (isProduction) {
	// Notice how we track pageview when route is changed
	Router.events.on("routeChangeComplete", url => gtag.pageview(url));
}

const MyApp = ({ Component, pageProps }) => (
	<CookiesProvider>
		<Fragment>
			{isProduction ? (
				<Head>
					<Script
						async
						src="https://www.googletagmanager.com/gtag/js?id=G-3QYSYY399Z"
					></Script>
					<Script>
						window.dataLayer = window.dataLayer || []; function
						gtag(){dataLayer.push(arguments)}
						gtag('js', new Date()); gtag('config', 'G-3QYSYY399Z');
					</Script>
				</Head>
			) : null}
			<Component {...pageProps} />
		</Fragment>
	</CookiesProvider>
);

export default wrapper.withRedux(MyApp);
