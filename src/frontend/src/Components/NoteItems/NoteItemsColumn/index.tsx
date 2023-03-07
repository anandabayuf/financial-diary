import { Space } from 'antd';
import AppButton from '../../General/AppButton';
import AppText from '../../General/AppText';
import { NoteItemColumnsType } from './interfaces/interfaces';
import { formatIDR } from '../../../Utils/CurrencyUtils';
import { ColumnsType } from 'antd/es/table';
import { ITEM_TYPE } from '../../../Constants/Constants';
import dayjs from 'dayjs';
import { TNoteItemResponse } from '../../../Api/interfaces/types';

const NoteItemColumns: NoteItemColumnsType = ({
	walletNoteId,
	isCategory,
	isWallet,
	I18n,
	handleDelete,
	handleEdit,
}) => {
	const debitRender = (): ColumnsType<TNoteItemResponse> =>
		!isCategory
			? [
					{
						title: (
							<AppText
								text={I18n?.t('label.debit')}
								strong
							/>
						),
						dataIndex: 'debit',
						key: 'debit',
						sorter: (a, b) =>
							ITEM_TYPE[a.type] === 'Transfer or Withdraw'
								? walletNoteId === a.walletNoteId
									? 0 - b.debit
									: a.debit - b.debit
								: a.debit - b.debit,
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
					text={I18n?.t('label.date')}
					strong
				/>
			),
			dataIndex: 'date',
			key: 'date',
			sorter: (a, b) =>
				new Date(a.date).getTime() - new Date(b.date).getTime(),
			render: (_, record) => (
				<AppText text={dayjs(record.date).format('DD-MM-YYYY')} />
			),
		},
		{
			title: (
				<AppText
					text={I18n?.t('label.description')}
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
					text={I18n?.t('label.credit')}
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
					text={I18n?.t('label.action')}
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
							{I18n?.t('label.edit')}
						</AppButton>
						<AppButton
							type='text'
							onClick={() => handleDelete && handleDelete(record)}
							danger
						>
							{I18n?.t('label.delete')}
						</AppButton>
					</Space>
				);
			},
		},
	];
};

export default NoteItemColumns;
