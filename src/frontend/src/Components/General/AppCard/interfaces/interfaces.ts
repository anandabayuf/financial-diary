import { CardProps } from 'antd';

export interface AppCardProps extends CardProps {
	children?: React.ReactNode;
	isMobileShowCard?: string;
}

export interface StyledCardProps {
	backgroundcolor?: string;
	ismobileshowcard?: string;
}
