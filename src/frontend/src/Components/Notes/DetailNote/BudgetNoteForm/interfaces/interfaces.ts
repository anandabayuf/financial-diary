import { DetailNoteFormProps } from '../../DetailNoteForm/interfaces/interfaces';

export interface BudgetNoteFormProps extends DetailNoteFormProps {
	isAdd?: boolean;
	isEdit?: boolean;
	data?: any;
}
