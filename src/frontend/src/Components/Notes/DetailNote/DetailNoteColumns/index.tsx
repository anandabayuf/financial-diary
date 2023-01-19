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
