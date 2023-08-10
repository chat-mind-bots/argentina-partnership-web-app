import React, { useEffect } from "react";
import styles from "./partners.module.css";
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
      // tg.openLink("https://google.com");
      tg.sendData({ data: "menu", button_text: "text" });
    });
  });
  return (
    <WebAppProvider>
      <MainButton />
      <BackButton />
      <button onClick={onScan}>Scan</button>
    </WebAppProvider>
    // <div className={styles.body}>
    //   {tg.BackButton(true)}
    //   <button onClick={onScan}>Scan</button>
    //   <button onClick={onClose}>Закрыть</button>
    // </div>
  );
};

export default Partners;
