import { NotesOptionYearProps } from './interfaces/interfaces';

const NotesOptionYear = ({ years, I18n }: NotesOptionYearProps) => {
	const options = years?.map((year) => {
		return {
			label: year,
			value: year,
		};
	});

	return [
		{
			label: I18n?.t('label.all_year'),
			value: 'all-year',
		},
		...options!,
	];
};

export default NotesOptionYear;
