import { DataViewTypeNames } from '../../../../../Constants/DataViewTypeNames';
import { TableProps } from 'antd';
import { i18n } from 'i18next';
import { ChangeEventHandler } from 'react';
import {
	TWalletNoteResponse,
	TCategoryNoteResponse,
} from '../../../../../Api/interfaces/types';

export type BudgetType = (TWalletNoteResponse | TCategoryNoteResponse) & {
	credit: number;
	debit: number;
	name: string;
};

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
	handleChangeDataViewType?: (values: DataViewTypeNames) => void;
	handleChangeSearch?: ChangeEventHandler<HTMLInputElement>;
	handleSearch?: (value: string) => void;
}
