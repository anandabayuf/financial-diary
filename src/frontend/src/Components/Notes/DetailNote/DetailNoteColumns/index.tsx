import AppButton from '../../../General/AppButton';
import AppText from '../../../General/AppText';
import { DetailNoteColumnsType } from './interfaces/interfaces';
import { formatIDR } from '../../../../Utils/CurrencyUtils';

const DetailNoteColumns: DetailNoteColumnsType = ({
	isWallet,
	isCategory,
	isBudget,
	I18n,
	handleView,
	handleEdit,
}) => {
	return isCategory || isWallet
		? [
				{
					title: (
						<AppText
							text={
								isWallet
									? I18n?.t('label.wallet')
									: I18n?.t('label.category')
							}
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
							text={
								isWallet
									? I18n?.t('label.balance')
									: I18n?.t('label.total')
							}
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
							text={I18n?.t('label.budget_items')}
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
							text={I18n?.t('label.budget.balance')}
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
							text={I18n?.t('label.budget.total')}
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
							text={I18n?.t('label.spent')}
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
							text={I18n?.t('label.remains')}
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
								onClick={() => handleEdit && handleEdit(record)}
							>
								{I18n?.t('label.edit')}
							</AppButton>
						);
					},
				},
		  ];
};

export default DetailNoteColumns;
