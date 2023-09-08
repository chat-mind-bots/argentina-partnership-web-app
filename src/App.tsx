import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "shared/router";
import PageLoader from "shared/components/page-loader";
import { useTelegram } from "hooks/useTelegram";
import { BusinessProvider } from "shared/business/provider/businesses.provider";
import { ConfigProvider } from "antd";

function App() {
	const { tg, theme } = useTelegram();
	useEffect(() => {
		tg.setHeaderColor(tg.themeParams.secondary_bg_color);
	}, [tg]);
	return (
		<BusinessProvider>
			<ConfigProvider
				theme={{
					token: {
						// colorText: theme.text_color,
						// colorTextPlaceholder: theme.hint_color,
						// colorTextDisabled: theme.hint_color,
						// colorBgContainer: theme.secondary_bg_color,
						// colorBgElevated: theme.bg_color,
					},
					components: {
						Tabs: {
							cardBg: theme.bg_color,
							itemActiveColor: theme.text_color,
							itemHoverColor: theme.link_color,
							// colorText: theme.text_color,
							itemSelectedColor: theme.link_color,
							inkBarColor: theme.link_color,
							horizontalMargin: "0 10px 16px 10px",
						},
						Button: {
							colorTextDisabled: theme.text_color,
						},
					},
				}}
			>
				<RouterProvider router={router} fallbackElement={<PageLoader />} />
			</ConfigProvider>
		</BusinessProvider>
	);
}

export default App;
