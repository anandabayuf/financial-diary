import { DefaultOptionType, BaseOptionType } from 'antd/es/select';
import { ColorState } from '../../../../Constants/Colors';
import { SelectProps } from 'antd';

export interface AppSelectProps extends SelectProps {}

export interface StyledSelectProps {
	themeselect?: ColorState;
}

export interface StyledContainerProps {
	theme?: ColorState;
}
