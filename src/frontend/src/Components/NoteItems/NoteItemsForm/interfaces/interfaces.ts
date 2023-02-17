import { DatePickerProps } from 'antd';
import { i18n } from 'i18next';
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
	I18n?: i18n;
	handleChangeDatePicker?: DatePickerProps['onChange'];
	handleSubmit?: (values?: any) => void;
	handleCancel?: () => void;
}
