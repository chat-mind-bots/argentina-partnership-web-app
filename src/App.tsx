import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "shared/router";
import PageLoader from "shared/components/page-loader";

function App() {
	console.log(window.location.href);
	return <RouterProvider router={router} fallbackElement={<PageLoader />} />;
}

export default App;
