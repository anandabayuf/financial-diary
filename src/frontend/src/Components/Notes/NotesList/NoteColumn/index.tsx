import { ColumnsType } from 'antd/es/table';
import AppButton from '../../../General/AppButton';
import AppText from '../../../General/AppText';
import { NoteColumnsProps } from './interfaces/interfaces';
import {
	getFullYearFromDate,
	getLongMonthFromDate,
} from '../../../../Utils/DateUtils';

const NotesColumns: ({
	showYear,
	handleView,
}: NoteColumnsProps) => ColumnsType<any> = ({ handleView, showYear }) => {
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
								onClick={() => handleView && handleView(record)}
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
								onClick={() => handleView && handleView(record)}
							>
								View
							</AppButton>
						);
					},
				},
		  ];
};

export default NotesColumns;
