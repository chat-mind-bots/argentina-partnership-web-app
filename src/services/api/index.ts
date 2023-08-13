import axios, { CancelToken } from "axios";
import { config } from "./config";

export const instance = axios.create({
	...config.api,
});

// instance.interceptors.response.use(
// 	function (response) {
// 		return response;
// 	},
// 	function (error) {
// 		if (error.response.status === 401) {
// 			localStorage.removeItem("auth");
// 			location.reload();
// 		} else {
// 			throw error;
// 		}
// 	}
// );

export const cancelToken = axios.CancelToken;

type IBodyParams = object | string;

interface IQueryHeaders {
	[key: string]:
		| string
		| boolean
		| number
		| CancelToken
		| null
		| undefined
		| CallableFunction;
}

interface IRequest {
	authToken?: string;
	body?: IBodyParams;
	headers?: IQueryHeaders;
	query?: IQueryHeaders;
	extra?: IQueryHeaders;
	onUploadProgress?: CallableFunction;
	onDownloadProgress?: CallableFunction;
}
const request = <T>(
	method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
	url: string,
	params: IRequest = {}
) => {
	return new Promise<T>((resolve, reject) => {
		try {
			const body = params.body || {};
			const headers = {
				"Content-Type": "application/json",
				...(params.headers || {}),
			};

			const config: object = {
				url,
				method,
				headers,
				data: body,
				params: { ...params.query },
				...(params.extra || {}),
			};
			instance
				.request(config)
				.then((response: any) => {
					if (response.status >= 200 && response.status <= 299) {
						return resolve(response.data as T);
					} else {
						throw response.data?.message;
					}
				})
				.catch((error: any) => {
					if (!error?.response) {
						return reject("Can't reach server");
					}
					// eslint-disable-next-line no-unsafe-optional-chaining
					const { message } = error?.response?.data;
					return reject(message);
				});
		} catch (error: any) {
			return reject(error.message);
		}
	});
};

export const get = <T>(path: string, params: IRequest) =>
	request<T>("GET", path, params);

export const post = <T>(path: string, params: IRequest) =>
	request<T>("POST", path, params);

export const patch = <T>(path: string, params: IRequest) =>
	request<T>("PATCH", path, params);
