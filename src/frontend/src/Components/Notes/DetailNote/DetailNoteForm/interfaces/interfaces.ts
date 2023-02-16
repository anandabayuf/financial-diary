import { i18n } from 'i18next';
export interface DetailNoteFormProps {
	noteId?: string;
	walletData?: any[];
	categoryData?: any[];
	isWallet?: boolean;
	isCategory?: boolean;
	isLoading?: boolean;
	isFetching?: boolean;
	I18n?: i18n;
	handleSubmit?: (values: any) => void;
	handleCancel?: () => void;
}
