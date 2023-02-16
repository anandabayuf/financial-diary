import { DatePickerProps } from 'antd';
import { i18n } from 'i18next';
export interface NoteFormProps {
	handleSubmit?: (values: any) => void;
	isLoading?: boolean;
	handleChangeDatePicker?: DatePickerProps['onChange'];
	I18n?: i18n;
}
