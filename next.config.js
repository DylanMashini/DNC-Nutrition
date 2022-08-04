const path = require("path");
const withPreact = require("next-plugin-preact");

module.exports = withPreact({
	async redirects() {
		return [
			{
				source: "/products",
				destination: "/products/1",
				permanent: true,
			},
		];
	},
	sassOptions: {
		includePaths: [path.join(__dirname, "styles")],
	},
});
