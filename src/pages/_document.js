import { Fragment } from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class CustomDocument extends Document {
	static async getInitialProps(ctx) {
		const originalRenderPage = ctx.renderPage;
		const initialProps = await Document.getInitialProps(ctx);

		// Check if in production
		const isProduction = process.env.NODE_ENV === "production";

		return {
			...initialProps,
			isProduction,
		};
	}

	render() {
		const { isProduction } = this.props;

		return (
			<Html lang="en">
				<Head>
					<link
						rel="preconnect"
						href="https://fonts.googleapis.com"
					/>
					<link
						rel="preconnect"
						href="https://fonts.gstatic.com"
						crossOrigin="true"
					/>
					<link
						href="https://fonts.googleapis.com/css2?family=Lato&display=swap"
						rel="stylesheet"
					/>

					{/* We only want to add the scripts if in production */}
					{isProduction && (
						<>
							{/* Global Site Tag (gtag.js) - Google Analytics */}
							{/* <script
								async
								src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
							/> */}
							<script
								dangerouslySetInnerHTML={{
									__html: `
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());


                  `,
								}}
							/>
						</>
					)}
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}
