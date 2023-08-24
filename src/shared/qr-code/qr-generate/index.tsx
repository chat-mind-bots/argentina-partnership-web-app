import React, {
	Suspense,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";
import { post } from "services/api";
import {
	Await,
	defer,
	useAsyncValue,
	useLoaderData,
	useNavigate,
} from "react-router-dom";
import { Buffer } from "buffer";
import ContentLayout from "shared/components/content-layout";
import styles from "./qr-henearte.module.less";
import { BackButton, MainButton } from "@vkruglikov/react-telegram-web-app";
import PageLoader from "shared/components/page-loader";

interface QrCodeResponse {
	codeDocument: {
		_id: string;
		user: string;
		code: string;
		status: number;
		expiresAt: Date;
		createdAt: Date;
		updatedAt: Date;
	};
	qrCode: Buffer;
}

export async function loader() {
	// @ts-ignore
	const tg = window.Telegram.WebApp;
	const dataQRPromise = post<QrCodeResponse>("user-codes", {
		query: {
			userId: tg.initDataUnsafe?.user.id,
			light: tg.themeParams.secondary_bg_color,
			dark: tg.themeParams.button_color,
		},
	});

	return defer({ dataQR: dataQRPromise });
}

export function QRCodeGenerate() {
	const { codeDocument, qrCode } = useAsyncValue() as QrCodeResponse;
	const [imageURL, setImageURL] = useState("");
	const [[diffDays, diffH, diffM, diffS], setDiff] = useState([0, 0, 0, 0]);
	const [tick, setTick] = useState(false);

	const navigate = useNavigate();

	const finishTime = useMemo(
		() => new Date(codeDocument.expiresAt).getTime(),
		[codeDocument.expiresAt]
	);

	useEffect(() => {
		const blob = new Blob([Buffer.from(qrCode)]);
		const url = URL.createObjectURL(blob);
		setImageURL(url);

		return () => {
			URL.revokeObjectURL(url);
		};
	}, [qrCode]);

	useEffect(() => {
		const diff = (finishTime - new Date().getTime()) / 1000;
		if (diff < 0) return;
		setDiff([
			Math.floor(diff / 86400), // дни
			Math.floor((diff / 3600) % 24),
			Math.floor((diff / 60) % 60),
			Math.floor(diff % 60),
		]);
	}, [tick, finishTime]);

	useEffect(() => {
		const timerID = setInterval(() => setTick(!tick), 1000);
		return () => clearInterval(timerID);
	}, [tick]);

	const refreshPage = useCallback(() => {
		navigate(0);
	}, [navigate]);

	const toHomePage = useCallback(() => {
		navigate("/home");
	}, [navigate]);

	return (
		<ContentLayout headerPrimary={"Покажите QR-код при оплате"}>
			<div className={styles.wrapper}>
				<img src={imageURL} alt="QR" />
				<h1>{codeDocument.code}</h1>
				<p>
					{diffH < 10 ? `0${diffH}` : diffH}:{diffM < 10 ? `0${diffM}` : diffM}:
					{diffS < 10 ? `0${diffS}` : diffS}
				</p>
			</div>
			<BackButton onClick={toHomePage} />
			{diffM + diffDays + diffS + diffM === 0 && (
				<MainButton onClick={refreshPage} text={"Загрузить новый QR-код"} />
			)}
		</ContentLayout>
	);
}

export function Component() {
	const data = useLoaderData() as { dataQR: QrCodeResponse };
	return (
		<Suspense fallback={<PageLoader />}>
			<Await resolve={data.dataQR}>
				<QRCodeGenerate />
			</Await>
		</Suspense>
	);
}
