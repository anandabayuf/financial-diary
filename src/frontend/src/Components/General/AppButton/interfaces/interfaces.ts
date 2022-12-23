import { ButtonProps } from 'antd';

export interface AppButtonProps extends ButtonProps {
	children?: React.ReactNode;
}

export interface StyledButtonProps {
	backgroundcolor?: string;
	textcolor?: string;
}
