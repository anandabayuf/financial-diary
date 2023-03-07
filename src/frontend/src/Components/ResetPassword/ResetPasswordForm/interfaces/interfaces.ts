import { i18n } from 'i18next';
import { TResetPasswordPayload } from '../../../../Api/interfaces/types';

export type ResetPasswordFormType = TResetPasswordPayload & {
	newPasswordConfirmation: string;
};

export interface ResetPasswordFormProps {
	I18n?: i18n;
	isLoading?: boolean;
	handleResetPassword?: (values: ResetPasswordFormType) => void;
}
