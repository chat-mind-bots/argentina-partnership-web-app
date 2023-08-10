import React from "react";
import styles from "./partners.module.css";

// @ts-ignore
const tg = window.Telegram.WebApp;

tg.onEvent("qrTextReceived", () => {
  tg.openLink("https://google.com");
});
const Partners = () => {
  const onClose = () => {
    tg.close();
  };
  const onScan = () => {
    // tg.showScanQrPopup("menu");
    tg.showScanQrPopup();
  };
  return (
    <div className={styles.body}>
      <button onClick={onScan}>Scan</button>
      <button onClick={onClose}>Закрыть</button>
    </div>
  );
};

export default Partners;
