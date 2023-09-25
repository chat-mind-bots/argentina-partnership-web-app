enum TimeMsNameEnum {
	DAY = 86400000,
	HOUR = 3600000,
	MIN = 60000,
}

export const getLeftTime = (expiredDate: string) => {
	const leftTimeMs = new Date(expiredDate).valueOf() - new Date().valueOf();

	if (leftTimeMs > TimeMsNameEnum.DAY) {
		return `${Math.floor(leftTimeMs / TimeMsNameEnum.DAY)} дней`;
	}
	if (leftTimeMs > TimeMsNameEnum.HOUR) {
		return `${Math.floor(leftTimeMs / TimeMsNameEnum.HOUR)} часов`;
	}

	if (leftTimeMs <= TimeMsNameEnum.MIN) {
		return `вот-вот закончится`;
	}

	return `${Math.floor(leftTimeMs / TimeMsNameEnum.MIN)} минут`;
};
