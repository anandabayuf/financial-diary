import { i18n } from 'i18next';
import {
	TCategoryPayload,
	TCategoryResponse,
} from '../../../../../Api/interfaces/types';

export interface CategoryFormProps {
	isEdit?: boolean;
	data?: TCategoryResponse;
	handleSubmit?: (values: TCategoryPayload) => void;
	isLoading?: boolean;
	I18n?: i18n;
}
