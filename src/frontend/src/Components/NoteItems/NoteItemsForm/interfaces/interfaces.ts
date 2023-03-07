import { i18n } from 'i18next';
import dayjs from 'dayjs';
import {
	TWalletNoteResponse,
	TCategoryNoteResponse,
	TNoteItemResponse,
} from '../../../../Api/interfaces/types';
export interface NoteItemsFormProps {
	noteId?: string;
	isWallet?: boolean;
	isCategory?: boolean;
	isCreate?: boolean;
	isEdit?: boolean;
	isLoading?: boolean;
	isFetching?: boolean;
	walletNote?: TWalletNoteResponse[];
	categoryNote?: TCategoryNoteResponse[];
	data?: TNoteItemResponse;
	I18n?: i18n;
	handleSubmit?: (values: NoteItemFormType) => void;
	handleCancel?: () => void;
}

export interface NoteItemFormType {
	date: dayjs.Dayjs;
	description: string;
	type: string;
	categoryNoteId?: string;
	walletNoteId?: string;
	debit?: string;
	credit?: string;
}
