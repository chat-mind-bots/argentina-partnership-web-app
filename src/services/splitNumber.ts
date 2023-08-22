export const splitNumber = (
	num: number
): { wholePart: string; hundredths: string } => {
	const wholePart = Math.floor(num).toString();

	const hundredths = (Math.round((num - +wholePart) * 100) / 100)
		.toFixed(2)
		.slice(2);

	return { wholePart, hundredths };
};
