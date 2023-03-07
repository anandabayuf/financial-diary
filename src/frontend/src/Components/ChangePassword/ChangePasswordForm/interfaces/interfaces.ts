import { FormInstance } from 'antd';
import { i18n } from 'i18next';
import { TChangePasswordPayload } from '../../../../Api/interfaces/types';

export type ChangePasswordFormType = TChangePasswordPayload & {
	newPasswordConfirmation: string;
};

export interface ChangePasswordFormProps {
	form?: FormInstance;
	I18n?: i18n;
	isLoading?: boolean;
	handleSubmit?: (values: ChangePasswordFormType) => void;
}
