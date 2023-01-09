import { TableProps } from 'antd';
import { ColorState } from '../../../../Constants/Colors';

export interface AppTableProps extends TableProps<any> {
	data?: any[];
}

export interface StyledTableProps {
	tabletheme?: ColorState;
}
