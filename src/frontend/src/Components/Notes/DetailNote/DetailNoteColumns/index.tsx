import AppButton from '../../../General/AppButton';
import AppText from '../../../General/AppText';
import { DetailNoteColumnsType } from './interfaces/interfaces';
import { formatIDR } from '../../../../Utils/CurrencyUtils';

const DetailNoteColumns: DetailNoteColumnsType = ({
	isWallet,
	isCategory,
	isEstimation,
	handleView,
	handleEdit,
}) => {
	return isCategory || isWallet
		? [
				{
					title: (
						<AppText
							text={isWallet ? 'Wallet' : 'Category'}
							strong
						/>
					),
					dataIndex: isWallet ? 'wallet.name' : 'category.name',
					key: 'name',
					sorter: (a, b) => {
						if (isWallet) {
							return a.wallet.name < b.wallet.name ? -1 : 1;
						} else {
							return a.category.name < b.category.name ? -1 : 1;
						}
					},
					render: (_, record) => (
						<AppText
							text={
								isWallet
									? record.wallet.name
									: record.category.name
							}
						/>
					),
				},
				{
					title: (
						<AppText
							text={isWallet ? 'Balance' : 'Total'}
							strong
						/>
					),
					dataIndex: isWallet ? 'balance' : 'total',
					key: isWallet ? 'balance' : 'total',
					sorter: (a, b) => {
						if (isWallet) {
							return a.balance - b.balance;
						} else {
							return a.total - b.total;
						}
					},
					render: (_, record) => (
						<AppText
							text={formatIDR(
								isWallet ? record.balance : record.total
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
								onClick={handleView}
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
							text={'Estimation Items'}
							strong
						/>
					),
					dataIndex: 'name',
					key: 'name',
					render: (_, record) => <AppText text={record.name} />,
				},
				{
					title: (
						<AppText
							text='Debit'
							strong
						/>
					),
					dataIndex: 'debit',
					key: 'debit',
					render: (_, record) =>
						(record.debit || record.debit === 0) && (
							<AppText text={formatIDR(record.debit)} />
						),
				},
				{
					title: (
						<AppText
							text='Credit'
							strong
						/>
					),
					dataIndex: 'credit',
					key: 'credit',
					render: (_, record) =>
						(record.credit || record.credit === 0) && (
							<AppText text={formatIDR(record.credit)} />
						),
				},
				{
					title: (
						<AppText
							text='Spent'
							strong
						/>
					),
					dataIndex: 'total',
					key: 'total',
					render: (_, record) =>
						(record.total || record.total === 0) && (
							<AppText text={formatIDR(record.total)} />
						),
				},
				{
					title: (
						<AppText
							text='Remains'
							strong
						/>
					),
					dataIndex: 'estimated.remains',
					key: 'remains',
					render: (_, record) =>
						(record.estimated.remains ||
							record.estimated.remains === 0) && (
							<AppText
								text={formatIDR(record.estimated.remains)}
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
								onClick={() => handleEdit && handleEdit(record)}
							>
								Edit
							</AppButton>
						);
					},
				},
		  ];
};

export default DetailNoteColumns;
