import React from "react"

// @ts-ignore
const tg = window.Telegram.WebApp;

const Partners = () => {
    const onClose = () => {
        tg.close()
    }
    const onScan = () => {
        tg.showScanQrPopup()
    }
    return <><button onClick={onScan}>Scan</button><button onClick={onClose}>Закрыть</button></>
}

export default Partners