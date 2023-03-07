import { i18n } from 'i18next';
import { TNoteItemResponse } from '../../../../Api/interfaces/types';
export interface NoteItemsDeleteModalProps {
	deletedData: TNoteItemResponse;
	isCategory?: boolean;
	isLoading?: boolean;
	isModalDeleteOpen?: boolean;
	I18n?: i18n;
	handleCancelDelete?: () => void;
	handleDelete?: () => void;
}
