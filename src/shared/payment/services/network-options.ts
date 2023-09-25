import { SelectOption } from "shared/components/select";
import { NetworksEnum } from "shared/payment/interfaces/networks.enum";
import { getNetworkTitle } from "shared/payment/services/get-network-title";

export const networkOptions: SelectOption[] = [
	{ label: getNetworkTitle(NetworksEnum.TRC20), value: NetworksEnum.TRC20 },
	{ label: getNetworkTitle(NetworksEnum.BEP20), value: NetworksEnum.BEP20 },
	// { label: getNetworkTitle(NetworksEnum.ERC20), value: NetworksEnum.ERC20 },
	// { label: getNetworkTitle(NetworksEnum.SOL), value: NetworksEnum.SOL },
];
