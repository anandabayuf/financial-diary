import { MenuProps } from 'antd';
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

export type ProfileMenuItemsType = (
	textColor?: string,
	isLight?: boolean,
	handleChangeTheme?: (e: any) => void,
	backgroundcolor?: string
) => MenuProps['items'];
