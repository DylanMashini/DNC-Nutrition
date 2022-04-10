import React, { Fragment } from "react";
import Router from "next/router";
import { wrapper } from "../store";
import { CookiesProvider } from "react-cookie";

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
					<script
						async
						src="https://www.googletagmanager.com/gtag/js?id=G-3QYSYY399Z"
					></script>
					<script>
						window.dataLayer = window.dataLayer || []; function
						gtag(){dataLayer.push(arguments)}
						gtag('js', new Date()); gtag('config', 'G-3QYSYY399Z');
					</script>
				</Head>
			) : null}
			<Component {...pageProps} />
		</Fragment>
	</CookiesProvider>
);

export default wrapper.withRedux(MyApp);
