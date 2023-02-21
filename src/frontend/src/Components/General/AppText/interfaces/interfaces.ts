import { TextProps } from 'antd/es/typography/Text';

export interface AppTextProps extends TextProps {
	text?: React.ReactNode;
	isMuted?: boolean;
}

export interface StyledTextProps {
	textcolor?: string;
}
