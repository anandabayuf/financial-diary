import { i18n } from 'i18next';
export interface CategoryFormProps {
	isEdit?: boolean;
	data?: any;
	handleSubmit?: (values: any) => void;
	isLoading?: boolean;
	I18n?: i18n;
}
