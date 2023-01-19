import { NotesOptionYearProps } from './interfaces/interfaces';

const NotesOptionYear = ({ years }: NotesOptionYearProps) => {
	const options = years?.map((year) => {
		return {
			label: year,
			value: year,
		};
	});

	return [
		{
			label: 'All Year',
			value: 'all-year',
		},
		...options!,
	];
};

export default NotesOptionYear;
