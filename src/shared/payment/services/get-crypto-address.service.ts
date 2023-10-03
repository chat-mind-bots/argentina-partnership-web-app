import { NetworksEnum } from "shared/payment/interfaces/networks.enum";

export const getCryptoAddressService = (network: NetworksEnum) => {
	switch (network) {
		case NetworksEnum.TRC20:
			return import.meta.env.VITE_ADDRESS_TRC20;
		// case NetworksEnum.ERC20:
		// 	return import.meta.env.VITE_ADDRESS_ERC20;
		// case NetworksEnum.SOL:
		// 	return import.meta.env.VITE_ADDRESS_SOL;
		case NetworksEnum.BEP20:
			return import.meta.env.VITE_ADDRESS_BEP20;
	}
};
