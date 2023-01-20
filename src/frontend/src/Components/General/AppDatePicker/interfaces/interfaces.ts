import { ColorState } from '../../../../Constants/Colors';
import { DatePickerProps } from 'antd';

export type AppDatePickerProps = DatePickerProps & {};

export interface StyledDatePickerProps {
	theme?: ColorState;
}
