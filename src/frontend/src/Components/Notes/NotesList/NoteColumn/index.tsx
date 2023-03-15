import AppButton from '../../../General/AppButton';
import AppText from '../../../General/AppText';
import { NoteColumnsType } from './interfaces/interfaces';
import { TNoteResponse } from '../../../../Api/interfaces/types';
import {
	getFullYearFromDate,
	getLongMonthFromDate,
} from '../../../../Utils/DateUtils';
import { ColumnsType } from 'antd/es/table';
import AppTag from '../../../General/AppTag';

const NotesColumns: NoteColumnsType = ({
	handleView,
	showYear,
	showClosed,
	I18n,
	language,
}) => {
	const showYearColumn: () => ColumnsType<TNoteResponse> = () =>
		showYear === 'all-year'
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
						render: (_, record: TNoteResponse) => (
							<AppText text={getFullYearFromDate(record.date)} />
						),
					},
			  ]
			: [];

	const showClosedColumn: () => ColumnsType<TNoteResponse> = () =>
		showClosed === 'all'
			? [
					{
						title: (
							<AppText
								text={I18n?.t('label.status')}
								strong
							/>
						),
						dataIndex: 'closed',
						key: 'closed',
						sorter: (a, b) => (a.closed ? 1 : 0),
						render: (_, record: TNoteResponse) => (
							<AppTag color={record.closed ? 'error' : 'success'}>
								{I18n?.t(
									record.closed
										? 'label.closed'
										: 'label.active'
								)}
							</AppTag>
						),
					},
			  ]
			: [];

	return [
		...showYearColumn(),
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
				<AppText text={getLongMonthFromDate(record.date, language)} />
			),
		},
		...showClosedColumn(),
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
