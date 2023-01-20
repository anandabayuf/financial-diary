import { DataViewTypeNames } from '../../../../../Constants/DataViewTypeNames';

export interface DetailNoteTabProps {
	noteId?: string;
	isWallet?: boolean;
	data?: any[];
	dataList?: any[];
	isLoading?: boolean;
	isSearching?: boolean;
	dataViewType?: DataViewTypeNames;
	modalAdd?: React.ReactNode;
	handleClickAdd?: () => void;
	handleClickView?: () => void;
	handleChangeDataViewType?: (values: any) => void;
	handleChangeSearch?: (e: any) => void;
	handleSearch?: (value: string) => void;
}
