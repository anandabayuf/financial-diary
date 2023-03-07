import { MenuProps } from 'antd';
import { SwitchChangeEventHandler } from 'antd/es/switch';
import { i18n } from 'i18next';
import { MenuClickEventHandler } from 'rc-menu/lib/interface';
export interface MainLayoutProps {
	children?: React.ReactNode;
}

export interface StyledHeaderProps {
	backgroundcolor?: string;
	borderbottomcolor?: string;
}

export interface StyledContentProps {
	backgroundcolor?: string;
}

export interface ProfileMenuItemsProps {
	backgroundcolor?: string;
}

export interface ProfileMenuItemsProps {
	textColor?: string;
	isLight?: boolean;
	I18n?: i18n;
	isEnglish?: boolean;
	isDropdownLangOpen?: boolean;
	setIsDropdownLangOpen?: React.Dispatch<React.SetStateAction<boolean>>;
	handleChangeTheme?: SwitchChangeEventHandler;
	handleChangeLang?: MenuClickEventHandler;
}

export type ProfileMenuItemsType =
	({}: ProfileMenuItemsProps) => MenuProps['items'];
