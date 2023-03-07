import { DatePickerProps } from 'antd';
import { i18n } from 'i18next';
import { TNotePayload } from '../../../../../Api/interfaces/types';
export interface NoteFormProps {
	handleSubmit?: (values: TNotePayload) => void;
	isLoading?: boolean;
	handleChangeDatePicker?: DatePickerProps['onChange'];
	I18n?: i18n;
}
