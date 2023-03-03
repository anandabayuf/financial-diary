import { FormInstance } from 'antd';
import { i18n } from 'i18next';

export interface ForgotPasswordFormProps {
	I18n?: i18n;
	form?: FormInstance;
	isLoading?: boolean;
	handleSend?: (values: any) => void;
}
