import { i18n } from 'i18next';
export interface NoteItemsDeleteModalProps {
	deletedData?: any;
	isCategory?: boolean;
	isLoading?: boolean;
	isModalDeleteOpen?: boolean;
	I18n?: i18n;
	handleCancelDelete?: () => void;
	handleDelete?: () => void;
}
