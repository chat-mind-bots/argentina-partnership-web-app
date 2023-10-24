import React from "react";
import ReactDOM from "react-dom/client";
import "./index.less";
import App from "./App";

import * as Sentry from "@sentry/react";
import {
	createRoutesFromChildren,
	matchRoutes,
	useLocation,
	useNavigationType,
} from "react-router-dom";

Sentry.init({
	dsn: "https://d73e43b308f904ac6a52c905665a5ecf@o4505999146811392.ingest.sentry.io/4505999148122112",
	integrations: [
		new Sentry.BrowserTracing({
			routingInstrumentation: Sentry.reactRouterV6Instrumentation(
				React.useEffect,
				useLocation,
				useNavigationType,
				createRoutesFromChildren,
				matchRoutes
			),
		}),
		new Sentry.Replay(),
	],

	tracesSampleRate: 1.0,
	tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],

	replaysSessionSampleRate: 0.1,
	replaysOnErrorSampleRate: 1.0,
});
const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(<App />);
