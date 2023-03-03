import { i18n } from 'i18next';

export interface ResetPasswordFormProps {
	I18n?: i18n;
	isLoading?: boolean;
	handleResetPassword?: (values: any) => void;
}
