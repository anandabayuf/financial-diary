import { ColorState } from '../../../../Constants/Colors';
import { MenuProps } from 'antd';
import ThemeModeNames from '../../../../Constants/ThemeModeNames';
import { i18n } from 'i18next';

export interface SiderLayoutProps {
	theme?: ColorState;
	menu?: {
		selectedKeys?: string[];
		opensKeys?: string[];
		onOpenChange?: MenuProps['onOpenChange'];
	};
	I18n?: i18n;
}

export interface StyledSiderProps {
	backgroundcolor?: string;
	borderrightcolor?: string;
}

export interface StyledMenuProps {
	theme?: ColorState;
	thememode?: ThemeModeNames;
}

export interface MenuItemProps {
	I18n?: i18n;
}

export type MenuItemsType = ({ I18n }: MenuItemProps) => MenuProps['items'];
