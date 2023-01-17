import { ColumnsType } from 'antd/es/table';
import AppButton from '../../General/AppButton';
import AppText from '../../General/AppText';
import { NoteColumnsProps } from './interfaces/interfaces';

const NoteColumns: ({
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
						<AppText
							text={new Date(record.date).toLocaleString(
								'en-us',
								{
									year: 'numeric',
								}
							)}
						/>
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
					render: (_, record) => (
						<AppText
							text={new Date(record.date).toLocaleString(
								'en-us',
								{
									month: 'long',
								}
							)}
						/>
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
									navigate(`/notes/${record._id}`, {
										state: record,
									})
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
					render: (_, record) => (
						<AppText
							text={new Date(record.date).toLocaleString(
								'en-us',
								{
									month: 'long',
								}
							)}
						/>
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
									navigate(`/notes/${record._id}`, {
										state: record,
									})
								}
							>
								View
							</AppButton>
						);
					},
				},
		  ];
};

export default NoteColumns;
