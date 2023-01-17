import { DefaultOptionType, BaseOptionType } from 'antd/es/select';
import { ColorState } from '../../../../Constants/Colors';

export interface AppSelectProps {
	options?: (DefaultOptionType | BaseOptionType)[];
	value?: any;
	placeholder?: string;
	loading?: boolean;
	handleChange?: (
		value: unknown,
		option:
			| DefaultOptionType
			| BaseOptionType
			| (DefaultOptionType | BaseOptionType)[]
	) => void;
}

export interface StyledSelectProps {
	theme?: ColorState;
}

export interface StyledContainerProps {
	theme?: ColorState;
}
