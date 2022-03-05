const path = require("path");

module.exports = {
	webpack: config => {
		config.resolve.fallback = { fs: false };
	},
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
};
