import { ColumnsType } from 'antd/es/table';

export interface NoteItemColumnsProps {
	walletNoteId?: string;
	isCategory?: boolean;
	isWallet?: boolean;
	handleEdit?: (record?: any) => void;
	handleDelete?: (record?: any) => void;
}

export type NoteItemColumnsType =
	({}: NoteItemColumnsProps) => ColumnsType<any>;
