import { ColumnsType } from 'antd/es/table';
import { i18n } from 'i18next';
export interface NoteColumnsProps {
	showYear?: string | number;
	handleView?: (record?: any) => void;
	I18n?: i18n;
	language?: 'en' | 'id';
}

export type NoteColumnsType = ({}: NoteColumnsProps) => ColumnsType<any>;
