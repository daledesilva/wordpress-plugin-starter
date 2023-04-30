const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const path = require('path');


////////////////
////////////////


function isDevelopment(mode) {
	return mode === "development";
}


module.exports = (env, argv) => {

	var config = {
		mode: argv.mode || 'development',	// Added for upgrade to webpack v5 (but probably redundant to above?)

		entry: {
			display: "./src/all-displays.js",
			editor: "./src/all-blocks.js",
			// editor_shared: "./src/editor-shared.js",
			// admin: "./src/admin.js"
		},
		output: {
			filename: "[name].js",
			path: path.join(process.cwd(), "dist"),
			// assetModuleFilename: 'images/[name].[ext]',	// This line seems doesn't work when building.
			assetModuleFilename: '[name][ext]',
		},
		// optimization: {
		// 	minimize: !isDevelopment(argv.mode),
		// 	minimizer: [
		// 		new TerserPlugin({
		// 			sourceMap: true
		// 		}),
		// 		new CssMinimizerPlugin(),
		// 	]
		// },
		plugins: [
			new CleanWebpackPlugin(),
			new MiniCssExtractPlugin({
				filename: "[name].css"
			}),
            new CopyPlugin({
                patterns: [
                    "./src/falter-in-resolute_card-plugin.php",
                ],
              }),
		],
		devtool: isDevelopment(argv.mode) ? "cheap-module-source-map" : false,
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader",
						options: {
							// plugins: ["@babel/plugin-proposal-class-properties"],
							presets: [
								// "@babel/preset-env", // Allows you to use the latest JavaScript without needing to micromanage which syntax transforms (and optionally, browser polyfills) are needed by your target environment(s)
								[
									"@babel/preset-react",
									{
										// these make sure JSX is converted into a wp.element (wrapper for React) command instead of a React command directly
										pragma: "wp.element.createElement",
										pragmaFrag: "wp.element.Fragment",
										// applies development mode for React based on mode argument passed through in package script
										development: isDevelopment(argv.mode)
									}
								]
							]
							// automatically uses browserlist from package.json too
						}
					}
				},
				{
					test: /\.(sa|sc|c)ss$/,
					use: [
						MiniCssExtractPlugin.loader, // 4. place css in separate file
						//'style-loader', // 4. place css in style tags in head
						"css-loader", // 3. resolve urls, etc. in css
						{
							loader: "postcss-loader",
							options: {
								postcssOptions: {
									plugins: [
									  [
										"autoprefixer", // uses browserlist from package.json automatically
										// "postcss-preset-env",
									  ],
									],
								},
							}
						}, // 2. Apply browser specific prefixes to css
						"resolve-url-loader", // 2 Resolve relative urls
						"sass-loader" // 1. interprets sass into css
					]
					// loaders are applied in bottom up order
				},
				{
					test: /\.(svg|png|jpe?g|gif)$/,
					type: 'asset/resource',
				},
				// Uninstalled from npm and removed - because SVGR changes the classnames and it was easier to just convert SVG's to JSX individually
				// {
				// 	test: /\.svg$/,
				// 	use: ["@svgr/webpack"], // , "url-loader" (This would convert to base64)
				// 	options: {

				// 	}
				// }
				
			]
		},
		externals: {
			// Webpack externals allows you to specify an included library (jquery - provided by WordPress) to map to an external library (jQuery - the full node module included separately).
			// This allows code completion from the node module version to appear when using the included version without exporting the node module version on export as that would be unnecessary.
			// It also tells Webpack not to bundle the node_module listed.
			// It also remaps ES6 imports on the left to become ES5 versions on the right.
			"@wordpress/blocks": ["wp", "blocks"],
			// "@wordpress/i18n": ["wp", "i18n"], // sometimes gives an error and prevents other code running
			"@wordpress/block-editor": ["wp", "blockEditor"],
			"@wordpress/editor": ["wp", "editor"],
			"@wordpress/data": ["wp", "data"],
			"@wordpress/plugins": ["wp", "plugins"],
			"@wordpress/edit-post": ["wp", "editPost"],
			"@wordpress/components": ["wp", "components"],
			"@wordpress/compose": ["wp", "compose"],
			"@wordpress/element": ["wp", "element"],
			"@wordpress/hooks": ["wp", "hooks"],
			// "lodash": "lodash", 	// This is to prevent redundancy like the others, but if not included it will clash with the WP lodash... saying "this.activateMode is not a function"
		}
	};

	// this was converted to a function returning a variable so that argv could be passed in
	return config;
};