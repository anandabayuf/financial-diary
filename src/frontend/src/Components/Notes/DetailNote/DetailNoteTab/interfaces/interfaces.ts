import { DataViewTypeNames } from '../../../../../Constants/DataViewTypeNames';

export interface DetailNoteTabProps {
	noteId?: string;
	isWallet?: boolean;
	data?: any[];
	isLoading?: boolean;
	dataViewType?: DataViewTypeNames;
	detailNoteGrid?: React.ReactNode;
	handleClickAdd?: () => void;
	handleClickView?: () => void;
	handleChangeDataViewType?: (values: any) => void;
}
