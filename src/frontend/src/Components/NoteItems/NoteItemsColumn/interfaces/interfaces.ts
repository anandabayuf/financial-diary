import { ColumnsType } from 'antd/es/table';
import { i18n } from 'i18next';
import { TNoteItemResponse } from '../../../../Api/interfaces/types';

export interface NoteItemColumnsProps {
	walletNoteId?: string;
	isCategory?: boolean;
	isWallet?: boolean;
	I18n?: i18n;
	handleEdit?: (record: TNoteItemResponse) => void;
	handleDelete?: (record: TNoteItemResponse) => void;
}

export type NoteItemColumnsType =
	({}: NoteItemColumnsProps) => ColumnsType<TNoteItemResponse>;
