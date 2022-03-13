const path = require("path");

module.exports = {
	webpack5: true,
	webpack: config => {
		config.resolve.fallback = { fs: false };
		return config;
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
const withMDX = require("@next/mdx")({
	extension: /\.mdx?$/,
	options: {
		remarkPlugins: [],
		rehypePlugins: [],
		// If you use `MDXProvider`, uncomment the following line.
		// providerImportSource: "@mdx-js/react",
	},
});
module.exports = withMDX({
	// Append the default value with md extensions
	pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
});

const withImages = require("next-images");
module.exports = withImages();
