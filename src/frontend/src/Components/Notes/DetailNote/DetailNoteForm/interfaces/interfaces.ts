import { i18n } from 'i18next';
import {
	TWalletResponse,
	TCategoryResponse,
} from '../../../../../Api/interfaces/types';
export interface DetailNoteFormProps {
	noteId?: string;
	walletData?: TWalletResponse[];
	categoryData?: TCategoryResponse[];
	isWallet?: boolean;
	isCategory?: boolean;
	isLoading?: boolean;
	isFetching?: boolean;
	I18n?: i18n;
	handleSubmit?: (values: DetailNoteFormType) => void;
	handleCancel?: () => void;
}

export interface DetailNoteFormType {
	ids: string[];
}
