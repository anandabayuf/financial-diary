import { SwitchProps } from 'antd';
import { ColorState } from '../../../../Constants/Colors';

export interface AppSwitchProps extends SwitchProps {}

export interface StyledSwitchProps {
	switchtheme?: ColorState;
}
