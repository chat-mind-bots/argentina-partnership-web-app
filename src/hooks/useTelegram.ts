// @ts-ignore
const tg = window.Telegram.WebApp;

export function useTelegram() {
	const onClose = () => {
		tg.close();
	};

	const onToggleButton = () => {
		if (tg.MainButton.isVisible) {
			tg.MainButton.hide();
		} else {
			tg.MainButton.show();
		}
	};

	const closeWebApp = () => {
		tg.onClose();
	};
	return {
		onClose,
		onToggleButton,
		close: closeWebApp,
		tg,
		user: tg.initDataUnsafe?.user,
		queryId: tg.initDataUnsafe?.query_id,
	};
}
