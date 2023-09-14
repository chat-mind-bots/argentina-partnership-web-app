import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "shared/router";
import PageLoader from "shared/components/page-loader";
import { useTelegram } from "hooks/useTelegram";
import { ConfigProvider } from "antd";
import PaymentProvider from "shared/context/payment/payment.provider";

function App() {
	const { tg, theme } = useTelegram();
	useEffect(() => {
		tg.setHeaderColor(tg.themeParams.secondary_bg_color);
	}, [tg]);
	return (
		<PaymentProvider>
			<ConfigProvider
				theme={{
					components: {
						Tabs: {
							cardBg: theme.bg_color,
							itemActiveColor: theme.text_color,
							itemHoverColor: theme.link_color,
							// colorText: theme.text_color,
							itemSelectedColor: theme.link_color,
							inkBarColor: theme.link_color,
							colorTextDisabled: theme.hint_color,
							horizontalMargin: "0 10px 16px 10px",
						},
						Button: {
							colorTextDisabled: theme.text_color,
						},
					},
				}}
			>
				{/*<RouterProvider router={router} fallbackElement={<PageLoader />} />*/}
				<RouterProvider router={router} fallbackElement={<PageLoader />} />
			</ConfigProvider>
		</PaymentProvider>
	);
}

export default App;
