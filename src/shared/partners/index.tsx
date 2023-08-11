import React, { useEffect } from "react";
import { Button, Form, Typography } from "antd";
import {
	WebAppProvider,
	MainButton,
	BackButton,
	useScanQrPopup,
	useShowPopup,
} from "@vkruglikov/react-telegram-web-app";
import { useTelegram } from "hooks/useTelegram";

const Partners = () => {
	const { tg } = useTelegram();
	const [showQrPopup, closeQrPopup] = useScanQrPopup();
	const showPopup = useShowPopup();
	// const { tg } = useTelegram();
	// const onClose = () => {
	//   tg.close();
	// };
	// const onScan = () => {
	//   // tg.showScanQrPopup("menu");
	//   tg.showScanQrPopup(true);
	// };

	// useEffect(() => {
	//   tg.onEvent("qrTextReceived", () => {
	//     tg.close();
	//     tg.sendData({ data: "menu", button_text: "text" });
	//   });
	// });
	return (
		<WebAppProvider>
			<MainButton />
			<BackButton />
			<Typography.Title>Сканировать QR код</Typography.Title>
			<button
				onClick={() =>
					showQrPopup(
						{
							text: "Наведите на QR код",
						},
						(text) => {
							closeQrPopup();
							tg.sendData(
								JSON.stringify({ info: "Info", text: text, data: "test" })
								// JSON.stringify({ data: "menu", button_text: "text" }),
							);
							// showPopup({
							//   message: text,
							// });
						}
					)
				}
			>
				Scan 2.0
			</button>
		</WebAppProvider>
	);
};

export default Partners;
