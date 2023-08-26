import { NetworksEnum } from "shared/payment/interfaces/networks.enum";

export const getNetworkTitle = (network: NetworksEnum) => {
	switch (network) {
		case NetworksEnum.BEP20:
			return "BNB Smart Chain (BEP20)";
		case NetworksEnum.ERC20:
			return "Ethereum (ERC20)";
		case NetworksEnum.SOL:
			return "Solana";
		case NetworksEnum.TRC20:
			return "Tron (TRC20)";
	}
};
