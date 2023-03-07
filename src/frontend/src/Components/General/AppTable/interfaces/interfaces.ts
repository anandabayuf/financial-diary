import { TableProps } from 'antd';
import { ColorState } from '../../../../Constants/Colors';

export interface AppTableProps extends TableProps<any> {
	showPagination?: boolean;
}

export interface StyledTableProps {
	tabletheme?: ColorState;
}
