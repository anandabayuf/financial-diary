import { ColorState } from '../../../../Constants/Colors';
import { MenuProps } from 'antd';

export interface SiderLayoutProps {
	theme?: ColorState;
	menu?: {
		selectedKeys?: string[];
		opensKeys?: string[];
		onOpenChange?: MenuProps['onOpenChange'];
	};
}

export interface StyledSiderProps {
	backgroundcolor?: string;
	borderrightcolor?: string;
}

export interface MenuStateType {
	selectedKeys?: string[];
	openKeys?: string[];
}

export interface StyledMenuProps {
	theme?: ColorState;
}
