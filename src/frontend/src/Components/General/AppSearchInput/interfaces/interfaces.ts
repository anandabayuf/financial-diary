import { SearchProps } from 'antd/es/input';
import { ColorState } from '../../../../Constants/Colors';

export interface AppSearchInputProps extends SearchProps {}

export interface StyledSearchInputProps {
	theme?: ColorState;
}
