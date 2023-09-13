import { createPortal } from "react-dom";
import styles from "shared/home/components/home.module.less";
import PageLoader from "shared/components/page-loader";
import React from "react";
import { useNavigation } from "react-router-dom";

const PortalLoader = () => {
	const isLoading = useNavigation().state === "loading";

	return (
		<>
			{isLoading &&
				createPortal(
					<div className={styles.loader}>
						<PageLoader />
					</div>,
					document.body
				)}
		</>
	);
};

export default PortalLoader;
