import { i18n } from 'i18next';
import { TNoteResponse } from '../../../../../Api/interfaces/types';
import { LocaleType } from '../../../../../Store/interfaces/interfaces';

export interface CloseNoteModalProps {
	data: TNoteResponse;
	isModalOpen?: boolean;
	I18n?: i18n;
	language?: LocaleType;
	isLoading?: boolean;
	handleCancel?: () => void;
	handleClose?: () => void;
}
