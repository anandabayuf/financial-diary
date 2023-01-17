import { CardProps } from 'antd';

export interface AppCardProps extends CardProps {
	children?: React.ReactNode;
	isMobileShowCard?: boolean;
}

export interface StyledCardProps {
	backgroundcolor?: string;
	ismobileshowcard?: boolean;
}
