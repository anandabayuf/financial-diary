import { FormItemProps } from 'antd';
import { ColorState } from '../../../../Constants/Colors';

export interface AppFormItemProps extends FormItemProps {
	children?: React.ReactNode;
}

export interface StyledFormItemProps {
	formitemtheme?: ColorState;
}
