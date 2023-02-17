import { MenuProps } from 'antd';
import { i18n } from 'i18next';
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
	handleChangeTheme?: (e: any) => void;
	handleChangeLang?: (e: any) => void;
}

export type ProfileMenuItemsType =
	({}: ProfileMenuItemsProps) => MenuProps['items'];
