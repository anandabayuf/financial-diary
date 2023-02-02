import { Space } from 'antd';
import AppButton from '../../General/AppButton';
import AppText from '../../General/AppText';
import { NoteItemColumnsType } from './interfaces/interfaces';
import { formatIDR } from '../../../Utils/CurrencyUtils';
import { ColumnsType } from 'antd/es/table';
import { ITEM_TYPE } from '../../../Constants/Constants';
import dayjs from 'dayjs';

const NoteItemColumns: NoteItemColumnsType = ({
	walletNoteId,
	isCategory,
	isWallet,
	handleDelete,
	handleEdit,
}) => {
	const debitRender = (): ColumnsType<any> =>
		!isCategory
			? [
					{
						title: (
							<AppText
								text='Debit'
								strong
							/>
						),
						dataIndex: 'debit',
						key: 'debit',
						sorter: (a, b) => a.debit - b.debit,
						render: (_, record) => (
							<AppText
								text={formatIDR(
									ITEM_TYPE[record.type] ===
										'Transfer or Withdraw'
										? walletNoteId === record.walletNoteId
											? 0
											: record.debit
										: record.debit
								)}
							/>
						),
					},
			  ]
			: [];

	return [
		{
			title: (
				<AppText
					text='Date'
					strong
				/>
			),
			dataIndex: 'date',
			key: 'date',
			sorter: (a, b) =>
				new Date(a.date).getTime() - new Date(b.date).getTime(),
			render: (_, record) => (
				<AppText text={dayjs(record.date).format('YYYY-MM-DD')} />
			),
		},
		{
			title: (
				<AppText
					text='Description'
					strong
				/>
			),
			dataIndex: 'description',
			key: 'description',
			sorter: (a, b) => (a.description < b.description ? -1 : 1),
			render: (_, record) => <AppText text={record.description} />,
		},
		...debitRender(),
		{
			title: (
				<AppText
					text='Credit'
					strong
				/>
			),
			dataIndex: 'credit',
			key: 'credit',
			sorter: (a, b) => a.credit - b.credit,
			render: (_, record) => (
				<AppText
					text={formatIDR(
						ITEM_TYPE[record.type] === 'Transfer or Withdraw'
							? walletNoteId === record.walletNoteId2
								? 0
								: record.credit
							: record.credit
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
					<Space>
						<AppButton
							type='text'
							onClick={() => handleEdit && handleEdit(record)}
						>
							Edit
						</AppButton>
						<AppButton
							type='text'
							onClick={() => handleDelete && handleDelete(record)}
							danger
						>
							Delete
						</AppButton>
					</Space>
				);
			},
		},
	];
};

export default NoteItemColumns;
