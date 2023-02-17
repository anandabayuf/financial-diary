import { ColumnsType } from 'antd/es/table';
import { i18n } from 'i18next';

export interface NoteItemColumnsProps {
	walletNoteId?: string;
	isCategory?: boolean;
	isWallet?: boolean;
	I18n?: i18n;
	handleEdit?: (record?: any) => void;
	handleDelete?: (record?: any) => void;
}

export type NoteItemColumnsType =
	({}: NoteItemColumnsProps) => ColumnsType<any>;
