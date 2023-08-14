const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const Dotenv = require("dotenv-webpack");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
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
			// new Dotenv(),
			new HtmlWebpackPlugin({
				title: "Finance App",
				template: "./public/index.html",
			}),
			new webpack.EnvironmentPlugin({ ...env }),
			new CleanWebpackPlugin(),
			new ForkTsCheckerWebpackPlugin(),
		],
	};
};
