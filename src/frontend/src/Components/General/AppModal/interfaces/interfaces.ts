import { ModalProps } from 'antd';
import { ColorState } from '../../../../Constants/Colors';

export interface AppModalProps extends ModalProps {}

export interface StyledModalProps {
	modaltheme?: ColorState;
}
