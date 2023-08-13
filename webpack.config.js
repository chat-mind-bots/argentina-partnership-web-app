const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const webpack = require("webpack");
module.exports = {
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
		extensions: [".tsx", ".ts", ".js", ".jsx"],
		modules: ["node_modules", "src"],
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: "Finance App",
			template: "./public/index.html",
		}),
		new webpack.DefinePlugin({
			"process.env.BASE_URL": JSON.stringify(process.env.BASE_URL),
			"process.env.MODE": JSON.stringify(process.env.MODE),
			"process.env.BACKEND_PORT": JSON.stringify(process.env.BACKEND_PORT),
			"process.env.BACKEND_ENDPOINT": JSON.stringify(
				process.env.BACKEND_ENDPOINT
			),
		}),
		new CleanWebpackPlugin(),
		new ForkTsCheckerWebpackPlugin(),
	],
};
