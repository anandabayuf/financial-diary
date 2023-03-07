import { i18n } from 'i18next';
import { TNoteResponse } from '../../../../../Api/interfaces/types';
export interface NotesGridProps {
	data?: TNoteResponse[];
	showYear?: string | number;
	handleView?: (record: TNoteResponse) => void;
	I18n?: i18n;
	language?: 'en' | 'id';
}
