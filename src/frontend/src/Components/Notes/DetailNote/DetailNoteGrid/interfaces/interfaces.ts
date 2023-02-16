import { i18n } from 'i18next';
export interface DetailNoteGridProps {
	isWallet?: boolean;
	data?: any[];
	I18n?: i18n;
	handleView?: (record: any) => void;
}
