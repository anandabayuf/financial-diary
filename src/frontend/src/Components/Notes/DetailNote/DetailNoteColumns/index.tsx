import AppButton from '../../../General/AppButton';
import AppText from '../../../General/AppText';
import { DetailNoteColumnsType } from './interfaces/interfaces';
import { formatIDR } from '../../../../Utils/CurrencyUtils';

const DetailNoteColumns: DetailNoteColumnsType = ({ isWallet, handleView }) => {
	return [
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
					text={isWallet ? record.wallet.name : record.category.name}
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
					text={formatIDR(isWallet ? record.balance : record.total)}
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
	];
};

export default DetailNoteColumns;
