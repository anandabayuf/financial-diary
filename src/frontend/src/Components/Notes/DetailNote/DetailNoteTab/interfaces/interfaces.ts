import { DataViewTypeNames } from '../../../../../Constants/DataViewTypeNames';
import { TableProps } from 'antd';
import { i18n } from 'i18next';

export interface DetailNoteTabProps {
	noteId?: string;
	isWallet?: boolean;
	isCategory?: boolean;
	isBudget?: boolean;
	data?: any[];
	dataList?: any[];
	isLoading?: boolean;
	isSearching?: boolean;
	dataViewType?: DataViewTypeNames;
	modalAdd?: React.ReactNode;
	pagination?: TableProps<any>['pagination'];
	I18n?: i18n;
	handleClickAdd?: () => void;
	handleClickView?: (record: any) => void;
	handleClickEdit?: (record: any) => void;
	handleChangeDataViewType?: (values: any) => void;
	handleChangeSearch?: (e: any) => void;
	handleSearch?: (value: string) => void;
}
