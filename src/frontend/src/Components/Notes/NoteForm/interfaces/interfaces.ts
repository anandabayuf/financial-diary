import { DatePickerProps } from 'antd';
export interface NoteFormProps {
	handleSubmit?: (values: any) => void;
	isLoading?: boolean;
	handleChangeDatePicker?: DatePickerProps['onChange'];
}
