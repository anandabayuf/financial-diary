import { ColorState } from '../../../../Constants/Colors';
import { i18n } from 'i18next';
export interface HeaderLayoutProps {
	user?: any;
	theme?: ColorState;
	handleOpenDrawer?: () => void;
	I18n?: i18n;
	language?: 'en' | 'id';
}

export interface StyledDropwdownProps {
	backgroundcolor?: string;
}

export interface StyledUsernameContainerProps {
	themecontainer?: ColorState;
}
