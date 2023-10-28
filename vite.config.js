import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import { sentryVitePlugin } from "@sentry/vite-plugin";
import path from "path";

export default ({ mode }) => {
	process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

	return defineConfig({
		publicDir: "src/public",
		server: {
			port: 3001,
			host: "localhost.arg-partnership.com",
		},
		preview: {
			port: 3001,
			host: "localhost.arg-partnership.com",
		},
		build: {
			outDir: "build",
		},
		resolve: {
			alias: {
				shared: path.resolve(__dirname, "src/shared"),
				hooks: path.resolve(__dirname, "src/hooks"),
				public: path.resolve(__dirname, "src/public"),
				services: path.resolve(__dirname, "src/services"),
			},
		},
		plugins: [
			sentryVitePlugin({
				org: "clubdeamigos",
				project: "javascript-react",
				authToken: process.env.VITE_SENTRY_AUTH_TOKEN,
			}),
			react({
				include: "**/*.{jsx,tsx}",
				babel: {
					plugins: ["babel-plugin-styled-components"],
				},
			}),
			svgr(),
		],
	});
};
