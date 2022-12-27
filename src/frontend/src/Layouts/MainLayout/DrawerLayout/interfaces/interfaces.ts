import { MenuProps } from 'antd';
import { ColorState } from '../../../../Constants/Colors';

export interface DrawerLayoutProps {
	theme?: ColorState;
	isOpen?: boolean;
	handleClose?: () => void;
	menu?: {
		selectedKeys?: string[];
		opensKeys?: string[];
		onOpenChange?: MenuProps['onOpenChange'];
	};
}

export interface StyledDrawerProps {
	backgroundcolor?: string;
	borderbottomcolor?: string;
}
