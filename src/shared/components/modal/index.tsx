import React, { FC, ReactNode } from "react";
import Close from "public/assets/icons/close.svg";
import ReactDOM from "react-dom";
import styles from "./modal.module.less";

interface IOwnProps {
	children: ReactNode;
	isOpen: boolean;
	onClose(): void;
}
const Modal: FC<IOwnProps> = ({ children, isOpen, onClose }) => {
	const closeModal = () => {
		onClose();
	};

	return ReactDOM.createPortal(
		<div className={`${styles.modal} ${isOpen ? styles.open : ""}`}>
			<div className={styles.modalHeader}>
				<button className={styles.closeButton} onClick={closeModal}>
					<Close />
				</button>
			</div>
			<div className={styles.modalContent}>{children}</div>
		</div>,
		document.body
	);
};

export default Modal;
