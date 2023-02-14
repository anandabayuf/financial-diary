import { i18n } from 'i18next';
export interface WalletFormProps {
	isEdit?: boolean;
	data?: any;
	handleSubmit?: (values: any) => void;
	isLoading?: boolean;
	I18n?: i18n;
}
