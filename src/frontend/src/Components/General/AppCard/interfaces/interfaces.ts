import { CardProps } from 'antd';

export interface AppCardProps extends CardProps {
	children?: React.ReactNode;
}

export interface StyledCardProps {
	backgroundcolor?: string;
}
