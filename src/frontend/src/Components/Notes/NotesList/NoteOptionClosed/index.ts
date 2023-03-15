import { VIEW_NOTE_TYPE } from '../../../../Constants/Constants';
import { NotesOptionClosedProps } from './interfaces/interfaces';

const NotesOptionClosed = ({ I18n }: NotesOptionClosedProps) => {
	const options = VIEW_NOTE_TYPE.map((item) => {
		return {
			label: I18n?.t(`label.${item}`),
			value: item,
		};
	});

	return options;
};

export default NotesOptionClosed;
