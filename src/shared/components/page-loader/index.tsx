import React from "react";
import styles from "./page-loader.module.css";
import { Space, Spin } from "antd";

const PageLoader = () => {
	return (
		<Space direction="vertical" className={styles.loaderWrapper}>
			<Space>
				<Spin tip="Loading" size="large" className={styles.loader} />
			</Space>
		</Space>
	);
};

export default PageLoader;
