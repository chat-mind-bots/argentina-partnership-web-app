import React, { useEffect } from "react";
import styles from "shared/partners/partners.module.css";
import { useTelegram } from "hooks/useTelegram";
import {
  WebAppProvider,
  MainButton,
  BackButton,
} from "@vkruglikov/react-telegram-web-app";

const Partners = () => {
  const { tg } = useTelegram();
  const onClose = () => {
    tg.close();
  };
  const onScan = () => {
    // tg.showScanQrPopup("menu");
    tg.showScanQrPopup(true);
  };

  useEffect(() => {
    tg.onEvent("qrTextReceived", () => {
      tg.close();
      tg.sendData({ data: "menu", button_text: "text" });
    });
  });
  return (
    <WebAppProvider>
      <MainButton />
      <BackButton />
      <button onClick={onScan}>Scan</button>
    </WebAppProvider>
  );
};

export default Partners;
