import AppButton from '../../../General/AppButton';
import AppText from '../../../General/AppText';
import { NoteColumnsType } from './interfaces/interfaces';
import {
	getFullYearFromDate,
	getLongMonthFromDate,
} from '../../../../Utils/DateUtils';

const NotesColumns: NoteColumnsType = ({
	handleView,
	showYear,
	I18n,
	language,
}) => {
	return showYear === 'all-year'
		? [
				{
					title: (
						<AppText
							text={I18n?.t('label.year')}
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
							text={I18n?.t('label.month')}
							strong
						/>
					),
					dataIndex: 'date',
					key: 'date',
					sorter: (a, b) =>
						new Date(a.date).getTime() - new Date(b.date).getTime(),
					render: (_, record) => (
						<AppText
							text={getLongMonthFromDate(record.date, language)}
						/>
					),
				},
				{
					title: (
						<AppText
							text={I18n?.t('label.action')}
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
								{I18n?.t('label.view')}
							</AppButton>
						);
					},
				},
		  ]
		: [
				{
					title: (
						<AppText
							text={I18n?.t('label.month')}
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
							text={I18n?.t('label.action')}
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
								{I18n?.t('label.view')}
							</AppButton>
						);
					},
				},
		  ];
};

export default NotesColumns;
