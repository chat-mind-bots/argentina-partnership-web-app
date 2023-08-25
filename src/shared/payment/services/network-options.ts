import { SelectOption } from "shared/components/select";
import { NetworksEnum } from "shared/payment/interfaces/networks.enum";

export const networkOptions: SelectOption[] = [
	{ label: "Tron (TRC20)", value: NetworksEnum.TRC20 },
	{ label: "BNB Smart Chain (BEP20)", value: NetworksEnum.BEP20 },
	{ label: "Ethereum (ERC20)", value: NetworksEnum.ERC20 },
	{ label: "Solana", value: NetworksEnum.SOL },
];
