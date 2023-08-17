const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");

const BundleAnalyzerPlugin =
	require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const webpack = require("webpack");

module.exports = (env) => {
	return {
		mode: "development",
		entry: "./src/index.tsx",
		output: {
			path: path.resolve(__dirname, "./build"),
			filename: "[name].[hash].js",
			publicPath: "/",
		},
		devServer: {
			port: 3001,
			static: {
				directory: path.resolve(__dirname, "./build"),
			},
			historyApiFallback: {
				disableDotRule: true,
			},
		},
		optimization: {
			minimizer: [
				new UglifyJsPlugin({
					uglifyOptions: {
						beautify: false,
						comments: false,
						compress: {
							sequences: true,
							booleans: true,
							loops: true,
							unused: true,
							warnings: false,
							drop_console: true,
							unsafe: true,
						},
					},
				}),
			],
			splitChunks: {
				chunks: "async",
				minSize: 20000,
				minRemainingSize: 0,
				minChunks: 1,
				maxAsyncRequests: 30,
				maxInitialRequests: 30,
				enforceSizeThreshold: 50000,
				cacheGroups: {
					defaultVendors: {
						test: /[\\/]node_modules[\\/]/,
						priority: -10,
						chunks: "all",
						reuseExistingChunk: true,
					},
					default: {
						minChunks: 2,
						priority: -20,
						reuseExistingChunk: true,
					},
				},
			},
		},
		module: {
			rules: [
				{
					test: /\.(le|c)ss$/,
					use: ["style-loader", "css-loader", "less-loader"],
				},
				{
					test: /\.(woff|woff2|otf|ttf|eot|png|jpg|jpeg|gif)$/i,
					use: {
						loader: "file-loader",
						options: {
							name: "[name].[hash].[ext]",
							outputPath: "./assets",
						},
					},
				},
				{
					test: /\.svg$/,
					use: ["@svgr/webpack"],
				},
				{
					test: /\.(js|ts)x?$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader",
					},
				},
			],
		},
		resolve: {
			extensions: [".tsx", ".ts", ".js", ".jsx", "less", "css", "scss"],
			modules: ["node_modules", "src"],
			alias: {
				process: "process/browser",
				Components: path.resolve(__dirname, "src/shared/"),
			},
		},
		plugins: [
			new CompressionPlugin({
				algorithm: "gzip",
				test: /\.(js|css|html)$/,
				threshold: 10240,
				minRatio: 0.8,
			}),
			// new BundleAnalyzerPlugin(),
			new HtmlWebpackPlugin({
				title: "Partnership web-app",
				template: "./public/index.html",
			}),
			new webpack.EnvironmentPlugin({ ...env }),
			new CleanWebpackPlugin(),
			new ForkTsCheckerWebpackPlugin(),
		],
	};
};
