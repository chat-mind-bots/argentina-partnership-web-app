import { IStartParam } from "shared/main";

export const createBotStartLink = () => {
	// @ts-ignore
	const startParam = window.Telegram.WebApp.initDataUnsafe?.start_param;
	if (startParam) {
		const decodedDataString = atob(startParam);
		const decodedData = JSON.parse(decodedDataString) as IStartParam;
		if (decodedData.ref) {
			return `https://t.me/${import.meta.env.VITE_BOTNAME}?start=refId=${
				decodedData.ref
			}`;
		}
	}

	return `https://t.me/argentina_bot?start`;
};
