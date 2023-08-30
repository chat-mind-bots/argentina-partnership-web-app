import React from "react";
import styles from "./address.module.css";
import { IAddress } from "shared/business/interfaces/address.interface";

interface AddressProps {
	address: IAddress;
}

const AddressBlock = ({ address }: AddressProps) => {
	return (
		<div>
			<div>
				{address.isExist && (
					<div className={styles.addressWrapper}>
						<div className={styles.addressItem}>
							<div className={styles.addressItemHeader}>Адрес:</div>
							<div>{address.addressLine}</div>
						</div>
						{address.googleMapsLink && (
							<div className={styles.addressItem}>
								<div className={styles.addressWrapper}>
									<div>
										<div className={styles.addressItemHeader}>
											Мы на картах:
										</div>
										<a href={address.googleMapsLink} target={"_blank"}>
											<div>{address.googleMapsLink}</div>
										</a>
									</div>
								</div>
							</div>
						)}
						{address.comment && (
							<div className={styles.addressItem}>
								<div className={styles.addressWrapper}>
									<div className={styles.addressItemHeader}>
										Как до нас добраться?
									</div>
									<div>
										<div>{address.comment}</div>
									</div>
								</div>
							</div>
						)}
					</div>
				)}
			</div>
			<div>
				{!address.isExist && (
					<div>
						<div>Адрес: Не задан</div>
						<div>Свяжитесь с представителем см. "Контакты"</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default AddressBlock;
