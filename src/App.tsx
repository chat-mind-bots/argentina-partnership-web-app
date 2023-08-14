import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "shared/router";
import PageLoader from "shared/components/page-loader";
import { WebAppProvider } from "@vkruglikov/react-telegram-web-app";

function App() {
	return (
		<WebAppProvider>
			<RouterProvider router={router} fallbackElement={<PageLoader />} />
		</WebAppProvider>
	);
}

export default App;
