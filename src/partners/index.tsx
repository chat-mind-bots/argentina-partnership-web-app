import React from "react"
import styles from "./partners.module.css"

// @ts-ignore
const tg = window.Telegram.WebApp;

const Partners = () => {
    const onClose = () => {
        tg.close()
    }
    const onScan = () => {
        tg.showScanQrPopup(true)
    }
    return <div className={styles.body}><button onClick={onScan}>Scan</button><button onClick={onClose}>Закрыть</button></div>
}

export default Partners