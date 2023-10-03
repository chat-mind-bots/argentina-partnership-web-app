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
	dsn: "https://4bbf7a04b475bd259c74002f31f0f445@o4505988001431552.ingest.sentry.io/4505988032626688",
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
