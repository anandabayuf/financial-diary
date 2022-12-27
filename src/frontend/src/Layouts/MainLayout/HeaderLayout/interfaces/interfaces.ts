import { ColorState } from '../../../../Constants/Colors';
export interface HeaderLayoutProps {
	user?: any;
	theme?: ColorState;
	handleOpenDrawer?: () => void;
}

export interface StyledDropwdownProps {
	backgroundcolor?: string;
}

export interface StyledSwitchProps {
	backgroundcolor?: string;
}
