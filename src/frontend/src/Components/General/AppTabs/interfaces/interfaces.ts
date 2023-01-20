import { TabsProps } from 'antd';
import { ColorState } from '../../../../Constants/Colors';

export interface AppTabsProps extends TabsProps {}

export interface StyledTabsProps {
	theme?: ColorState;
}
