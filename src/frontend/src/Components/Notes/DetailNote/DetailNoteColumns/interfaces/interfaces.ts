import { ColumnsType } from 'antd/es/table';
import { i18n } from 'i18next';

export interface DetailNoteColumnsProps {
	isWallet?: boolean;
	isCategory?: boolean;
	isBudget?: boolean;
	I18n?: i18n;
	handleView?: (record: any) => void;
	handleEdit?: (record: any) => void;
}

export type DetailNoteColumnsType =
	({}: DetailNoteColumnsProps) => ColumnsType<any>;
