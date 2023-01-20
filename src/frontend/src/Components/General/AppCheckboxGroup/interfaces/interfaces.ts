import { CheckboxGroupProps, CheckboxOptionType } from 'antd/es/checkbox';
import { ColorState } from '../../../../Constants/Colors';

export interface AppCheckboxGroupProps extends CheckboxGroupProps {}

export interface StyledCheckboxGroupProps {
	checkboxtheme?: ColorState;
}
