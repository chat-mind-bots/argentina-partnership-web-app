import React, { useEffect } from "react";
import { Button, Form, Typography } from "antd";
import {
  WebAppProvider,
  MainButton,
  BackButton,
  useScanQrPopup,
  useShowPopup,
} from "@vkruglikov/react-telegram-web-app";

const Partners = () => {
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
              showPopup({
                message: text,
              });
            },
          )
        }
      >
        Scan 2.0
      </button>
    </WebAppProvider>
  );
};

export default Partners;
