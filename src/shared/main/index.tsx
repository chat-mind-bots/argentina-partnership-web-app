import React from "react";
import { redirect } from "react-router-dom";

export interface IStartParam {
	page?: string;
	ref?: string;
}

export async function loader() {
	// @ts-ignore
	const startParam = window.Telegram.WebApp.initDataUnsafe?.start_param;
	console.log(startParam);
	if (startParam) {
		const decodedDataString = atob(startParam);
		const decodedData = JSON.parse(decodedDataString) as IStartParam;
		return redirect(`${decodedData.page}`);
	}
	return redirect("/home");
}

export const Component = () => {
	return <div>Redirect</div>;
};

// export default Component;
