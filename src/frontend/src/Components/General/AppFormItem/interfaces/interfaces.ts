import { FormItemProps } from 'antd';

export interface AppFormItemProps extends FormItemProps {
	children?: React.ReactNode;
}

export interface StyledFormItemProps {
	textcolor?: string;
}
