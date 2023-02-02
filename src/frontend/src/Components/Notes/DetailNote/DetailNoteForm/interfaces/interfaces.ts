export interface DetailNoteFormProps {
	noteId?: string;
	walletData?: any[];
	categoryData?: any[];
	isWallet?: boolean;
	isCategory?: boolean;
	isLoading?: boolean;
	isFetching?: boolean;
	handleSubmit?: (values: any) => void;
	handleCancel?: () => void;
}
