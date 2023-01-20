export interface DetailNoteFormProps {
	noteId?: string;
	data?: any[];
	isWallet?: boolean;
	isLoading?: boolean;
	isFetching?: boolean;
	handleSubmit?: (values: any) => void;
	handleCancel?: () => void;
}
