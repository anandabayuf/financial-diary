import { i18n } from 'i18next';
export interface NotesGridProps {
	data?: any[];
	showYear?: string | number;
	handleView?: (record?: any) => void;
	I18n?: i18n;
	language?: 'en' | 'id';
}
