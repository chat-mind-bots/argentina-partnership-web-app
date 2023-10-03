import React, { useContext, useEffect, useState } from "react";
import { ReactComponent as Triangle } from "public/assets/icons/triangle.svg";
import { useNavigate } from "react-router-dom";
import styles from "./paymnet-affix.module.less";
import { PaymentContext } from "shared/context/payment/payment.context";

const PaymentAffix = () => {
	const navigate = useNavigate();

	const { payments, updatePayments } = useContext(PaymentContext);
	const navigateToPending = () => {
		navigate("/my-payments?status=pending");
	};

	const [collapse, setCollapse] = useState(false);

	const collapseHandler = () => {
		setCollapse(!collapse);
	};

	useEffect(() => {
		updatePayments && updatePayments();
	}, [updatePayments]);

	return payments ? (
		<div className={`${styles.wrapper} ${!collapse ? styles.collapse : ""}`}>
			<div
				className={`${styles.wrapperHandler} ${
					!collapse ? styles.collapse : ""
				}`}
				onClick={collapseHandler}
			>
				<Triangle />
			</div>
			<div className={styles.wrapperBody} onClick={navigateToPending}>
				У вас {payments} неоплаченных счетов!
				<br />
				Нажмите, чтобы перейти к оплате
			</div>
		</div>
	) : (
		<></>
	);
};

export default PaymentAffix;
