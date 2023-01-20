import { ColumnsType } from 'antd/es/table';
import AppButton from '../../../General/AppButton';
import AppText from '../../../General/AppText';
import { NoteColumnsProps } from './interfaces/interfaces';
import {
	getFullYearFromDate,
	getLongMonthFromDate,
	getTwoDigitMonthStringFromDate,
} from '../../../../Utils/DateUtils';

const NotesColumns: ({
	navigate,
	showYear,
}: NoteColumnsProps) => ColumnsType<any> = ({ navigate, showYear }) => {
	return showYear === 'all-year'
		? [
				{
					title: (
						<AppText
							text='Year'
							strong
						/>
					),
					dataIndex: 'date',
					key: 'date',
					render: (_: any, record: any) => (
						<AppText text={getFullYearFromDate(record.date)} />
					),
				},
				{
					title: (
						<AppText
							text='Month'
							strong
						/>
					),
					dataIndex: 'date',
					key: 'date',
					sorter: (a, b) =>
						new Date(a.date).getTime() - new Date(b.date).getTime(),
					render: (_, record) => (
						<AppText text={getLongMonthFromDate(record.date)} />
					),
				},
				{
					title: (
						<AppText
							text='Action'
							strong
						/>
					),
					key: 'action',
					align: 'center',
					render: (_, record) => {
						return (
							<AppButton
								type='text'
								onClick={() =>
									navigate &&
									navigate(
										`/notes/${getFullYearFromDate(
											record.date
										)}/${getTwoDigitMonthStringFromDate(
											record.date
										)}`
									)
								}
							>
								View
							</AppButton>
						);
					},
				},
		  ]
		: [
				{
					title: (
						<AppText
							text='Month'
							strong
						/>
					),
					dataIndex: 'date',
					key: 'date',
					sorter: (a, b) =>
						new Date(a.date).getTime() - new Date(b.date).getTime(),
					render: (_, record) => (
						<AppText text={getLongMonthFromDate(record.date)} />
					),
				},
				{
					title: (
						<AppText
							text='Action'
							strong
						/>
					),
					key: 'action',
					align: 'center',
					render: (_, record) => {
						return (
							<AppButton
								type='text'
								onClick={() =>
									navigate &&
									navigate(
										`/notes/${getFullYearFromDate(
											record.date
										)}/${getTwoDigitMonthStringFromDate(
											record.date
										)}`
									)
								}
							>
								View
							</AppButton>
						);
					},
				},
		  ];
};

export default NotesColumns;
