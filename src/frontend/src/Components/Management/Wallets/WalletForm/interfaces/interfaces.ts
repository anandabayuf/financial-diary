import { i18n } from 'i18next';
import {
	TWalletPayload,
	TWalletResponse,
} from '../../../../../Api/interfaces/types';

export interface WalletFormProps {
	isEdit?: boolean;
	data?: TWalletResponse;
	handleSubmit?: (values: TWalletPayload) => void;
	isLoading?: boolean;
	I18n?: i18n;
}
