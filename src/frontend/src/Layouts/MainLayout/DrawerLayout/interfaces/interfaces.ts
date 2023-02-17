import { MenuProps } from 'antd';
import { ColorState } from '../../../../Constants/Colors';
import { i18n } from 'i18next';

export interface DrawerLayoutProps {
	theme?: ColorState;
	isOpen?: boolean;
	handleClose?: () => void;
	menu?: {
		selectedKeys?: string[];
		opensKeys?: string[];
		onOpenChange?: MenuProps['onOpenChange'];
	};
	I18n?: i18n;
}

export interface StyledDrawerProps {
	backgroundcolor?: string;
	borderbottomcolor?: string;
}
