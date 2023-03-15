import { i18n } from 'i18next';
import { TNoteResponse } from '../../../../../Api/interfaces/types';
import { ShowClosedType } from '../../../../../Store/interfaces/interfaces';
export interface NotesGridProps {
	data?: TNoteResponse[];
	showYear?: string | number;
	showClosed?: ShowClosedType;
	handleView?: (record: TNoteResponse) => void;
	I18n?: i18n;
	language?: 'en' | 'id';
}
