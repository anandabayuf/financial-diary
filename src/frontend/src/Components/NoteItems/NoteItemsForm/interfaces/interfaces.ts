import { DatePickerProps } from 'antd';
export interface NoteItemsFormProps {
	noteId?: string;
	isWallet?: boolean;
	isCategory?: boolean;
	isCreate?: boolean;
	isEdit?: boolean;
	isLoading?: boolean;
	isFetching?: boolean;
	walletNote?: any[];
	categoryNote?: any[];
	data?: any;
	handleChangeDatePicker?: DatePickerProps['onChange'];
	handleSubmit?: (values?: any) => void;
	handleCancel?: () => void;
}
