import { FormInstance } from 'antd';
import { i18n } from 'i18next';

export interface ChangePasswordFormProps {
	form?: FormInstance;
	I18n?: i18n;
	isLoading?: boolean;
	handleSubmit?: (values: any) => void;
}
