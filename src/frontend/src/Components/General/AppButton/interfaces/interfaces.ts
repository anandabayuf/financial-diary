import { ButtonProps } from 'antd';
import ThemeModeNames from '../../../../Constants/ThemeModeNames';

export interface AppButtonProps extends ButtonProps {
	children?: React.ReactNode;
}

export interface StyledButtonProps {
	backgroundcolor?: string;
	textcolor?: string;
	thememode?: ThemeModeNames;
}
