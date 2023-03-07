import { ColumnsType } from 'antd/es/table';
import { i18n } from 'i18next';
import { TNoteResponse } from '../../../../../Api/interfaces/types';
export interface NoteColumnsProps {
	showYear?: string | number;
	handleView?: (record: TNoteResponse) => void;
	I18n?: i18n;
	language?: 'en' | 'id';
}

export type NoteColumnsType =
	({}: NoteColumnsProps) => ColumnsType<TNoteResponse>;
