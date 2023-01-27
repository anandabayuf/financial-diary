import { DetailNoteFormProps } from '../../DetailNoteForm/interfaces/interfaces';

export interface EstimationNoteFormProps extends DetailNoteFormProps {
	isAdd?: boolean;
	isEdit?: boolean;
	data?: any;
}
