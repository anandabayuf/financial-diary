import { DataViewTypeNames } from '../../../../../Constants/DataViewTypeNames';
import { TableProps } from 'antd';

export interface DetailNoteTabProps {
	noteId?: string;
	isWallet?: boolean;
	isCategory?: boolean;
	isEstimation?: boolean;
	data?: any[];
	dataList?: any[];
	isLoading?: boolean;
	isSearching?: boolean;
	dataViewType?: DataViewTypeNames;
	modalAdd?: React.ReactNode;
	pagination?: TableProps<any>['pagination'];
	handleClickAdd?: () => void;
	handleClickView?: (record: any) => void;
	handleClickEdit?: (record: any) => void;
	handleChangeDataViewType?: (values: any) => void;
	handleChangeSearch?: (e: any) => void;
	handleSearch?: (value: string) => void;
}
