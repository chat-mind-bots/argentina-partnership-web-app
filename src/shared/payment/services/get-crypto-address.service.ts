import { NetworksEnum } from "shared/payment/interfaces/networks.enum";
import * as process from "process";

export const getCryptoAddressService = (network: NetworksEnum) => {
	switch (network) {
		case NetworksEnum.TRC20:
			return process.env.ADDRESS_TRC20;
		case NetworksEnum.ERC20:
			return process.env.ADDRESS_ERC20;
		case NetworksEnum.SOL:
			return process.env.ADDRESS_SOL;
		case NetworksEnum.BEP20:
			return process.env.ADDRESS_BEP20;
	}
};
