import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "shared/router";
import PageLoader from "shared/components/page-loader";
import { useTelegram } from "hooks/useTelegram";
import { BusinessProvider } from "shared/business/provider/businesses.provider";

function App() {
	const { tg } = useTelegram();
	useEffect(() => {
		tg.setHeaderColor(tg.themeParams.secondary_bg_color);
	}, [tg]);

	return (
		<BusinessProvider>
			<RouterProvider router={router} fallbackElement={<PageLoader />} />
		</BusinessProvider>
	);
}

export default App;
